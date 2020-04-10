module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    config,
  } = params;

  return {
    preregister(req, res) {
      // Add validation, check for missing values, etc.
      const {
        dobYear,
        dobMonth,
        dobDay,
        nin,
        zip,
      } = req.body;

      // Months are 0-based in javascript, so subtract one
      const dob = new Date(dobYear, dobMonth - 1, dobDay);
      data.createVoter(nin, dob, zip)
          .then(() => {
            res.sendStatus(200);
          })
          .catch((error) => {
            let message;
            if (error.code == 'ER_DUP_ENTRY') {
              message = 'You have already registered.';
            } else {
              message =
                'An error occurred while preregistering. ' +
                 'Please try again later';
            }

            res.status(400).json({error: message});
          });
    },
    generateVotingToken(req, res) {
      const {
        nin,
        dhPbk,
        encOidDbIdHash,
      } = req.body;

      data.getVoter(nin)
          .then((voter) => {
            if (!voter) {
              throw new Error('You are not registered to vote online.');
            }

            if (!voter.enc_onlineidentity_id) {
              const message = 'You have only preregistered. ' +
              'Finish your registration by visiting the local administration';
              throw new Error(message);
            }

            if (typeof voter.enc_onlineidentity_id === 'string'
                || voter.enc_onlineidentity_id instanceof String) {
              voter.enc_onlineidentity_id =
                JSON.parse(voter.enc_onlineidentity_id);
            }

            return Promise.all([
              cryptoUtils.sha384(
                  voter.enc_onlineidentity_id.id,
                  encOidDbIdHash.salt),
              voter,
            ]);
          })
          .then((result) => {
            const [hash, voter] = result;

            if (hash !== encOidDbIdHash.hash) {
              throw new Error('Your credentials are invalid');
            }

            return data.issueVotingToken(voter, dhPbk);
          })
          .then((result) => {
            const [token, dhPublicKey] = result;
            res.json({token: token.value, dhPublicKey});
          })
          .catch((error) => {
            res.status(400).send(error.message);
          });
    },
    votingTokenInfo(req, res) {
      // convert token + dhPbk to a single json string
      // as in markVotingTokenUsedInElection, so there's no need to sign/verify
      // them separately
      const {
        token,
        signature,
        dhPbk,
      } = req.body;

      if (!token || !signature || !dhPbk) {
        res.sendStatus(403);
      }

      cryptoUtils.verifyECDSA256(
          config.votingServicePublicKey,
          token,
          signature
      ).then((isValid) => {
        if (!isValid) {
          throw new Error('Unauthorized');
        }

        return Promise.all([
          data.getVotingToken(token),
          cryptoUtils.generateECDHKeys(),
        ]);
      }).then((result) => {
        const [votingToken, keyPair] = result;

        if (!votingToken) {
          throw new Error('Invalid or expired voting token');
        }

        const infoToSend = {
          expirationDate: votingToken.expiry_date,
          options: votingToken.options,
        };

        return Promise.all([
          cryptoUtils.deriveECDHKey(dhPbk, keyPair.privateKey)
              .then((key) => {
                return cryptoUtils.encryptAES(key, JSON.stringify(infoToSend));
              }),
          keyPair.publicKey,
        ]);
      }).then((result) => {
        const [encTokenInfo, dhPbk] = result;

        res.json({
          encTokenInfo,
          dhPbk,
        });
      }).catch((error) => {
        res.status(400).send(error.message);
      });
    },
    markVotingTokenUsedInElection(req, res) {
      const {
        payload,
        signature,
      } = req.body;
      const now = new Date();

      const {
        electionId,
        token,
      } = JSON.parse(payload);

      cryptoUtils.verifyECDSA256(
          config.votingServicePublicKey,
          payload,
          signature
      ).then((isValid) => {
        if (!isValid) {
          throw new Error('Unauthorized');
        }

        return data.getVotingToken(token);
      }).then((votingToken) => {
        if (!votingToken || now > votingToken.expiry_date) {
          throw new Error('Invalid or expired voting token');
        }

        return data.createVotingRecord(votingToken.voter_id, electionId);
      }).then((votingRecord) => {
        if (!votingRecord) {
          throw new Error('An error occurred while recording vote');
        }

        res.sendStatus(200);
      }).catch((error) => {
        res.status(400).json({message: error.message});
      });
    },
  };
};
