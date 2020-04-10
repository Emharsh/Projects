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
      res.locals.page.title = 'eVoting System';
      res.locals.page.subtitle = 'Group 8';
      res.locals.page.id = 'home-page';
      return res.render('pages/index');
    },
    goto_about(req, res) {
      res.locals.page.title = 'About';
      res.locals.page.id = 'view-about';
      return res.render('pages/about');
    },
    goto_results(req, res) {
      res.locals.page.title = 'Results';
      res.locals.page.id = 'view-results';
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
      res.locals.page.title = 'Parties';
      res.locals.page.id = 'view-parties';
      return data.getAllParties()
          .then((parties) => {
            res.render('pages/parties', {parties});
          });
    },
    goto_ajax_test(req, res) {
      res.locals.page.title = 'Test';
      res.locals.page.id = 'view-test';
      return res.render('pages/ajax_test');
    },
    goto_postcodes(req, res) {
      res.locals.page.title = 'Test';
      res.locals.page.id = 'view-test';
      res.setHeader('Access-Control-Allow-Origin', '*mysociety.org,*wheredoivote.co.uk');
      return res.render('pages/postcodes');
    },
  };
};
