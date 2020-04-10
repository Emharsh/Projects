const constants = require('../../config/constants');
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    name: 'adminAcc',
    goto_account(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Admin Account';
      res.locals.page.id = 'admin-account';
      const elections = {};
      if (req.session && req.session.admin && req.query.loc) {
        data.getAllElection(req.query.loc).then((elections) => {
          for (const key of elections.keys()) {
            type = elections[key].type;
            startDate = elections[key].start_date;
            endDate = elections[key].end_date;
            elections[key].type = res.locals.settings.type[type-1];
            elections[key].start_date = startDate.getDate() + '/' +
                    (startDate.getMonth()+1) + '/' + startDate.getFullYear();
            elections[key].end_date = endDate.getDate() + '/' +
                    (endDate.getMonth()+1) + '/' + endDate.getFullYear();
          }

          return res.render('pages/admin/account/index', {elections});
        });
      } else {
        return res.render('pages/admin/account/index', {elections});
      }
    },
    goto_logout(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Admin Log-out';
      res.locals.page.id = 'admin-logout';
      if (req.session && req.session.admin) {
        req.session.destroy();
        req.session = null;
        res.locals.globals.is_loggedin_admin = false;
        return res.render('pages/admin/account/logout');
      } else {
        res.redirect('/admin/account/login/');
      }
    },
    goto_login(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Admin Log-in';
      res.locals.page.id = 'admin-login';
      return res.render('pages/admin/account/login');
    },
  };
};
