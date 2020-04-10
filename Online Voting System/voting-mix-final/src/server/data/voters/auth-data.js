/**
 *
 *
 * @export
 * @param {*} options
 * @return {AuthData}
 */
module.exports = function(options) {
  const {
    VotingToken,
    VotingRecord,
  } = options.models;

  const cryptoUtils = options.cryptoUtils;

  return {
    issueVotingToken(voter, ecdhVoterKey, expiryDate) {
      return cryptoUtils.generateECDHKeys().then((keys) => {
        return Promise.all([
          VotingToken.query().findOne('voter_id', '=', voter.id),
          cryptoUtils.deriveECDHKey(ecdhVoterKey, keys.privateKey),
          keys.publicKey,
        ]);
      }).then((result) => {
        const [token, derivedKey, publicDHKey] = result;
        const uuid = cryptoUtils.generateUuid();

        if (!expiryDate) {
          // default token expiry time: 40 minutes
          expiryDate = new Date(Date.now() + 40 * 60000);
        }

        // https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Validation
        // As all formats end with 9AA, the first part of a postcode can
        // easily be extracted by ignoring the last three characters
        const firstPartOfPostcodeRx = /((\d|\w)+)\s*\d\w\w$/gm;

        const matches = firstPartOfPostcodeRx.exec(voter.postcode);

        const options = {
          secret: derivedKey,
          postcode: matches[1],
        };

        const tokenData = {
          value: uuid,
          expiry_date: expiryDate,
          options: JSON.stringify(options),
        };

        if (!token) {
          tokenData.voter_id = voter.id;
          return Promise.all([
            VotingToken.query().insert(tokenData),
            publicDHKey,
          ]);
        }

        return Promise.all([
          token.$query().patchAndFetch(tokenData),
          publicDHKey,
        ]);
      });
    },
    getVotingToken(tokenValue) {
      return VotingToken.query()
          .findOne('value', '=', tokenValue)
          .then((token) => {
            // MariaDB (the CS school's instance) stores JSON as string
            // so parse it if that's the case
            if (token && (typeof token.options === 'string'
              || token.options instanceof String)) {
              token.options = JSON.parse(token.options);
            }

            return token;
          });
    },
    createVotingRecord(voterId, electionId) {
      return VotingRecord.query().insert({
        voter_id: voterId,
        election_id: electionId,
      }).catch((error) => {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new Error('Voting record already exists!');
        }

        throw error;
      });
    },
  };
};
