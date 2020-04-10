const constants = require('../../config/constants');
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    goto_results(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'View Results';
      res.locals.page.id = 'view-results';
      data.getAllElections().then((elections) => {
        return res.render('pages/admin/results/index', { elections });
      });
    },
    goto_view_result(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'View Result';
      res.locals.page.id = 'view-result';
      const redirct = '/admin/results/';

      const electionId = req.params.id;
      const id = parseInt(electionId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getElectionById(id).then((election) => {
          if (!election) {
            return res.redirect(redirct);
          } else {
            return res.render('pages/admin/results/result', { election });
          }
        });
      }
    },
  };
};
