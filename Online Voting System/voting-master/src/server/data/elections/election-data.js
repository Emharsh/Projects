/**
 *
 *
 * @export
 * @param {*} options
 * @return {ElectionData}
 */
module.exports = function(options) {
  const {
    ElectionCandidate,
    Ballot,
    Election,
    ElectoralRegions, 
    VotingSystems,
    ElectionTypes,
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

    getElectionByIdDeep(id) {
      return Election.query()
          .findById(id)
          .eager('[electionCandidates.[currentParty,candidate.party],electoralRegion,electionTypes.votingSystem,ballots]');
    },

    getElectionByElectoralRegion(id) {
      return ElectoralRegions.query().findById(id).eager('elections').orderBy('name');
    },

    getElectoralRegions() {
      return ElectoralRegions.query().eager('electionType').orderBy('nation').orderBy('type').orderBy('region').orderBy('name');
    },

    getElectionTypes() {
      return ElectionTypes.query().orderBy('id_election_types');
    },

    getVotingSystems() {
      return VotingSystems.query().orderBy('name');
    },

    getAllElections() {
      return Election.query().eager('[electionTypes,electoralRegion]').orderBy('start_Date');
    },

    getAllElectionsSlim(fields) {
      return Election.query().select(fields).eager('[electionTypes,electoralRegion]').orderBy('start_Date');
    },

    newElection(fields) {
      console.log(fields);
      return Election.query().insertGraphAndFetch(fields);
    },

    editElection(id, updateData) {
      console.log(updateData);
      return Election.query().where({id: id}).update(updateData);
    },

    updateElection(id, updateData) {
      return Election.query().patchAndFetchById(id, updateData);
    },

    editElectionCandidates(updateData) {
      return Election.query().upsertGraphAndFetch(updateData);
    },

    getElectionsForVoter(electoralRegionsNames) {
      return Election.query().select('*')
          .whereIn('electoral_regions_id', (builder) => {
            builder
                .select('id_regions')
                .from(ElectoralRegions.tableName)
                .whereRaw(
                    'UPPER(name) IN (?)',
                    [electoralRegionsNames.map((s) => {
                      return s.toUpperCase();
                    })]);
          })
          .eager('[electionTypes,electoralRegion,ballots]');
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
    getElectionCandidateById(id) {
      return ElectionCandidate.query().findById(id)
          .then((electionCandidate) => {
            if (electionCandidate
              && electionCandidate.results
              && (typeof electionCandidate.results === 'string'
                || electionCandidate.results instanceof String)) {
              electionCandidate.results = JSON.parse(electionCandidate.results);
            }

            return electionCandidate;
          });
    },
    updateElectionCandidate(id, updateData) {
      return ElectionCandidate.query().patchAndFetchById(id, updateData);
    },
  };
};
