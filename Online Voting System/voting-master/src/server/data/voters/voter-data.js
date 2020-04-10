/**
 *
 *
 * @export
 * @param {*} options
 * @return {VoterData}
 */

module.exports = function(options) {
  const {
    Voter, VoterRegion, ElectoralRegions, VotingRecord,
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
      return Voter.query().where({id: id}).update(updateData);
    },

    getVoterById(id) {
      return Voter.query().findById(id);
    },

    getVoterRegionsById(id) {
      return Voter.query().findById(id).eager('voterRegions.electionType');
    },

    createVoter(nationalInsuranceNumber, dateOfBirth, postCode) {
      return Voter.query()
          .insertAndFetch({
            nino: nationalInsuranceNumber.toUpperCase(),
            dob: dateOfBirth,
            postcode: postCode});
    },

    createVoterRegions(json, id) {
      const todaysDate = new Date();
      // eslint-disable-next-line guard-for-in
      for (const key in json.areas) {
        const area = json.areas[key];

        let type = -1;
        if (area.type === 'WMC') {
          type = 1;
          console.log(area);
        } else if (area.type === 'CPC') {
          if (area.country_name === 'England') {
            type = 2;
            console.log(area);
          }
        }
        if (type > -1) {
          ElectoralRegions.query().where('type', '=', type).findOne('name', 'LIKE', area.name).then((electoralRegion) => {
            if (electoralRegion) {
              VoterRegion.query().insert({
                electoral_regions_id: electoralRegion.id_regions,
                voter_id: id,
                last_updated: todaysDate,
              }).then((voterRegion) => {
                console.log(voterRegion);
              });
            }
          });
        }
      }
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
    getVotingRecord(voterId, electionId) {
      return VotingRecord.query().findOne({
        voter_id: voterId,
        election_id: electionId,
      });
    },
  };
};
