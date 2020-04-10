/**
 *
 *
 * @export
 * @param {*} options
 * @return {ElectionData}
 */
module.exports = function(options) {
  const {
    Party, Candidate, ElectionCandidate, Ballot, Election, ElectoralRegions, VotingSystems, ElectionTypes
  } = options.models;

  return {
    getAllCandidatesForElection(electionId) {
      return ElectionCandidate.query()
          .where({'election_id': electionId})
          .eager('[currentParty, candidate]');
    },

    getElectionById(electionId) {
      return Election.query()
          .findById(electionId)
          .eager('electionCandidates.[currentParty, candidate.party]');
    },

    getElectoralRegions() {
      return ElectoralRegions.query();
    },

    getElectionTypes() {
      return ElectionTypes.query();
    },

    getVotingSystems() {
      return VotingSystems.query();
    },

    getAllElections() {
      return Election.query().eager('[electionTypes,electoralRegion]');
    },

    getAllElectionsSlim(fields) {
      return Election.query().select(fields).eager('[electionTypes,electoralRegion]');
    },

    newElection(fields) {
      console.log(fields);
      return Election.query().insertGraphAndFetch(fields);
    },

    editElection(id, updateData) {
      console.log(updateData);
      return Election.query().where({ id: id }).update(updateData);
    },

    getElectionsForVoter(partialPostcode, onlineIdentityId) {
      const now = new Date();
      return Election.query()
          .whereNotIn('id', (builder) => {
            builder.select('election_id').from(Ballot.tableName)
                .where({onlineidentity_id: parseInt(onlineIdentityId)});
          })
          .andWhere('end_date', '>=', now)
          .andWhere('start_date', '<=', now)
          .andWhere((builder) => {
            builder
                .whereNull('postcodes')
                .orWhereRaw(`UPPER(postcodes) LIKE ?`,
                    [`%,${partialPostcode.toUpperCase()},%`]);
          })
          .eager('electionCandidates');
    },



    createElection(name, startDate, endDate,
        type, masterKey, candidates, postcodes
    ) {
      let postcodesString = null;
      if (postcodes && postcodes.length !== 0) {
        postcodesString = ',';
        postcodesString += postcodes.join(',');
        postcodesString += ',';
      }
      const electionCandidates = [];
      for (const candidate of candidates) {
        electionCandidates.push({
          candidate_id: candidate.id,
          current_party_id: candidate.party_id,
        });
      }

      return Election.query().insertGraphAndFetch({
        name,
        type,
        start_date: startDate,
        end_date: endDate,
        postcodes: postcodesString,
        master_key: masterKey,
        electionCandidates,
      });
    },
  };
};
