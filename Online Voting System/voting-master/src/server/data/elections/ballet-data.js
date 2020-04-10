/**
 *
 *
 * @export
 * @param {*} options
 * @return {BalletData}
 */
module.exports = function (options) {
  const {
    Party, Candidate, ElectionCandidate, Ballot, Election,
  } = options.models;

  return {
    getAllBallot() {
      return Ballot.query();
    },

    getElectionBallot(electionId) {
      return Ballot.query().where({ 'election_id': electionId });
    },

    removeBallot(ballotId) {
      return Ballot.query().deleteById(ballotId);
    },

    getBallotFromOidForElection(onlineIdentityId, electionId) {
      return Ballot.query().findOne({
        onlineidentity_id: parseInt(onlineIdentityId),
        election_id: parseInt(electionId),
      });
    },
    // check for uses and remove
    addBallot(electionId, onlineIdentityId, candidateId) {
      const encContent = Buffer.from(candidateId.toString());
      const encPassword = Buffer.from('password');
      const result = Ballot.query().insert({
        enc_content: encContent,
        enc_password: encPassword,
        election_id: electionId,
        onlineidentity_id: onlineIdentityId,
      });
      return result;
    },
    createBallot(electionId, onlineIdentityId, encContent, encPassword) {
      return Ballot.query().insertAndFetch({
        election_id: electionId,
        onlineidentity_id: onlineIdentityId,
        enc_content: encContent,
        enc_password: encPassword,
      });
    },
  };
};
