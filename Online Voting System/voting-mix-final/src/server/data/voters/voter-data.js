/**
 *
 *
 * @export
 * @param {*} options
 * @return {VoterData}
 */

module.exports = function(options) {
  const {
    Voter,
  } = options.models;


  return {
    getAllVoters() {
      return Voter.query();
    },

    getVoters(query) {
      return Voter.query()
          .where('nino', 'like', '%' + query.nino + '%')
          .orWhere('postcode', 'like', '%' + query.postcode + '%');
    },

    editVoter(id, updateData) {
      return Voter.query().where({ id: id }).update(updateData);
    },

    getVoterById(id) {
      return Voter.query().findById(id);
    },

    createVoter(nationalInsuranceNumber, dateOfBirth, postCode) {
      return Voter.query()
          .insert({
            nino: nationalInsuranceNumber.toUpperCase(),
            dob: dateOfBirth,
            postcode: postCode});
    },
    // returns undefined when no voter with such NINo is found
    getVoter(nationalInsuranceNumber) {
      return Voter.query()
          .findOne('nino', '=', nationalInsuranceNumber.toUpperCase());
    },
    updateVoter(voter, updateData) {
      return voter.$query().patchAndFetch(updateData);
    },
    updateVoterByNino(nationalInsuranceNumber, updateData) {
      return Voter.query()
          .patch(updateData)
          .where('nino', '=', nationalInsuranceNumber.toUpperCase());
    },
    updateVoterByID(id, updateData) {
      return Voter.query().findById(id)
          .patch(updateData);
    },
  };
};
