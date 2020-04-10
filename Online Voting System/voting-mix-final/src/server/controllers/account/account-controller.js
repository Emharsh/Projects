/**
 * @export
 * @param {*} params
 * @return {AccountController}
 */
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    goto_login(req, res) {
      res.locals.page.title = 'Voter Login';
      res.locals.page.id = 'voter-login';
      return res.render('pages/account/login');
    },
    goto_logout(req, res) {
      if (req.session && req.session.voter) {
        req.session.destroy();
        req.session = null;
        res.locals.globals.is_loggedin_general = false;
        return res.render('pages/account/logout');
      } else {
        res.redirect('/account/login/');
      }
    },
    goto_account(req, res) {
      const elections = {};
      if (req.session && req.session.voter && req.query.loc) {
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

          return res.render('pages/account/index', {elections});
        });
      } else {
        return res.render('pages/account/index', {elections});
      }
    },
    goto_register(req, res) {
      return res.render('pages/account/register');
    },
  };
};
