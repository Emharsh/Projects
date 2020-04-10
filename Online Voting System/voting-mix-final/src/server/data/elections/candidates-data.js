/**
 *
 *
 * @export
 * @param {*} options
 * @return {CandidatesData}
 */
module.exports = function (options) {
  const {
    Party, Candidate, ElectionCandidate, Ballot, Election,
  } = options.models;
  return {
    getAllCandidates() {
      return Candidate.query().eager('party');
    },

    getCandidate(candidateId) {
      return Candidate.query().findById(candidateId).eager('party');
    },

    getCandidatesByIds(ids) {
      return Candidate.query().findByIds(ids).eager('party');
    },

    editCandidate(id, updateData) {
      return Candidate.query().where({ id: id }).update(updateData);
    },

    newCandidate(updateData) {
      return Candidate.query().insertAndFetch(updateData);
    },

    getAllCandidates(select) {
      return Candidate.query().eager('party').select(select);
    },
  };
};
