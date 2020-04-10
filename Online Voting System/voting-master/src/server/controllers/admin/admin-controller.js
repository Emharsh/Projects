const constants = require('../../config/constants');
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    goto_index(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Admin Home';
      res.locals.page.id = 'admin-home';
      return res.render('pages/admin/index');
    },
  };
};
