/**
 *
 *
 * @export
 * @param {*} options
 * @return {PartiesData}
 */
module.exports = function (options) {
  const {
    Party, Candidate, ElectionCandidate, Ballot, Election,
  } = options.models;
  return {
    getAllParties() {
      return Party.query();
    },

    getParty(partyId) {
      return Party.query().findById(partyId);
    },

    editParty(id, updateData) {
      return Party.query().where({ id: id }).update(updateData);
    },

    newParty(updateData) {
      return Party.query().insertAndFetch(updateData);
    },

    createParty(name) {
      return Party.query().insertAndFetch({ name });
    },
  };
};
