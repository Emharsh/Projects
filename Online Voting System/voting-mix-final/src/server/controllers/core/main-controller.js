/**
 * @export
 * @param {*} params
 * @return {MainController}
 */
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    goto_index(req, res) {
      return res.render('pages/index');
    },
    goto_about(req, res) {
      return res.render('pages/about');
    },
    goto_results(req, res) {
      if (!req.query.loc) {
        return res.render('pages/results', {canidates: []});
      }

      data.getElectionBallot(req.query.loc).then((ballots) => {
        data.getAllCandidatesForElection(req.query.loc).then((candidates) => {
          const candidatesArray = [];
          for (const candidate of candidates) {
            candidatesArray[candidate.id] = candidate;
            candidatesArray[candidate.id].votes = 0;
          }

          for (const ballot of ballots) {
            candidateId = functions.blobToString(ballot.enc_content);
            if (!(typeof candidatesArray[candidate_id] === 'undefined')) {
              candidatesArray[candidate_id].votes += 1;
            }
          }

          candidatesArray.sort(function(first, second) {
            return second.votes - first.votes;
          });

          return res.render('pages/results', {canidates: candidatesArray});
        });
      });
    },
    goto_parties(req, res) {
      return data.getAllParties()
          .then((parties) => {
            res.render('pages/parties', {parties});
          });
    },
    goto_ajax_test(req, res) {
      return res.render('pages/ajax_test');
    },
    goto_postcodes(req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*mysociety.org,*wheredoivote.co.uk');
      return res.render('pages/postcodes');
    },
  };
};
