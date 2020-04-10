const constants = require('../../config/constants');
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    goto_statistics(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'View Statistics';
      res.locals.page.id = 'view-statistics';
      return res.render('pages/admin/statistics/index');
    },
  };
};
