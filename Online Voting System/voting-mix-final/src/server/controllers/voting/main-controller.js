module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    name: 'votingMain',
    listAvailableElections(req, res) {
      if ((req.session && req.session.voter)) {
        data.getElectionsForVoter(
            req.session.voter.postcode,
            req.session.voter.onlineIdentityId
        ).then((elections) => {
          return res.render('pages/voting/vote', {elections});
        });
      } else {
        res.redirect('/account/login/');
      }
    },
    displayBallotForElection(req, res) {
      if (req.session && req.session.voter) {
        let {id: electionId} = req.params;

        electionId = parseInt(electionId);
        if (isNaN(electionId)) {
          return res.redirect('/vote/');
        }

        Promise.all([
          data.getElectionById(electionId),
          data.getBallotFromOidForElection(
              req.session.voter.onlineIdentityId,
              electionId
          ),
        ]).then((result) => {
          const [election, castBallot] = result;
          const now = new Date();
          // if the voter tried to access an invalid election
          // or has already voted in the election, redirect to election list
          if ((!election || castBallot)
            || !(election.start_date <= now
              && election.end_date >= now)
            || (election.postcodes
              && !election.postcodes.includes(`,${req.session.voter.postcode},`)
            )
          ) {
            return res.redirect('/vote/');
          }

          return res.render('pages/voting/election-container', {election});
        });
      } else {
        res.redirect('/account/login/');
      }
    },
    vote(req, res) {
      const {
        ballotJsonString,
        signature,
      } = req.body;

      const ballot = JSON.parse(ballotJsonString);
      const now = new Date();
      if (!req.session || !req.session.voter) {
        return res.status(401).send({message: 'You are not authorised.'});
      }

      if (now > req.session.tokenExpirationDate) {
        req.session.destroy();
        req.session = null;
        return res.status(401).send({message: 'Your session has expired'});
      }
      let ballotDbId = null;
      data.getOnlineIdentity(req.session.voter.onlineIdentityId)
          .then((onlineIdentity) => {
            if (!onlineIdentity) {
              throw new Error('Invalid online identity file.');
            }

            return cryptoUtils.verifyECDSA256(
                onlineIdentity.public_key,
                ballotJsonString,
                signature,
                true
            );
          }).then((isSignatureValid) => {
            if (!isSignatureValid) {
              throw new Error('Invalid online identity file.');
            }


            return Promise.all([
              data.getElectionById(ballot.electionId),
              data.getBallotFromOidForElection(
                  req.session.voter.onlineIdentityId,
                  ballot.electionId
              ),
            ]);
          }).then((result) => {
            const [election, castBallot] = result;
            if (!election) {
              throw new Error('No such election exists.');
            }
            if (castBallot) {
              throw new Error('You have already voted in this election.');
            }
            if (!(election.start_date <= now
              && election.end_date >= now)) {
              throw new Error('Election is not currently active.');
            }
            if (election.postcodes
              && !election.postcodes.includes(`,${req.session.voter.postcode},`)
            ) {
              throw new Error('You cannot vote in this election!');
            }

            ballot.ageGroup = req.session.voter.ageGroup;

            const aesKey = cryptoUtils.randomHexString();

            return Promise.all([
              cryptoUtils.encryptAES(aesKey, JSON.stringify(ballot)),
              cryptoUtils.rsaPKCS1OaepEncrypt(election.master_key, aesKey),
            ]);
          }).then((result) => {
            const [encryptedBallot, encryptedAesKey] = result;

            return data.createBallot(
                ballot.electionId,
                req.session.voter.onlineIdentityId,
                JSON.stringify(encryptedBallot),
                encryptedAesKey);
          }).then((dbBallot) => {
            if (!dbBallot) {
              throw new Error('Ballot was not recorded! Try again.');
            }

            ballotDbId = dbBallot.id;

            return data.markTokenUsedInElection(
                req.session.voter.votingToken,
                dbBallot.election_id
            );
          }).then((votingRecordCreated) => {
            // === true assures that the value is boolean
            if (votingRecordCreated === true) {
              res.sendStatus(200);
            } else {
              throw new Error('An error occurred while recording your vote.');
            }
          }).catch((error) => {
            if (ballotDbId !== null && typeof ballotDbId == 'number') {
              data.removeBallot(ballotDbId).then(() => {
                res.status(400).send({message: error.message});
              });
            } else {
              return res.status(400).send({message: error.message});
            }
          });
    },
  };
};
