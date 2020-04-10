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
      res.locals.page.title = 'Voter Logout';
      res.locals.page.id = 'voter-logout';
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
      res.locals.page.title = 'Voter Account';
      res.locals.page.id = 'voter-account';
      console.log(req.session);
      if (req.session && req.session.voter && req.session.voter.electoralRegionsNames && req.session.voter.electoralRegionsNames.length > 0) {
        data.getElectionsForVoter(
          req.session.voter.electoralRegionsNames
        ).then((elections) => {
          return res.render('pages/account/index', { elections, onlineIdentityId: req.session.voter.onlineIdentityId });
        });
      } else {
        return res.render('pages/account/index', { elections: undefined});
      }

    },
    goto_register(req, res) {
      res.locals.page.title = 'Voter Register';
      res.locals.page.id = 'voter-register';
      const dateToday = new Date();
      res.locals.page.max_date = functions.dateToStdString(new Date(new Date().setFullYear(dateToday.getFullYear() - 15)));
      res.locals.page.min_date = functions.dateToStdString(new Date(new Date().setFullYear(dateToday.getFullYear() - 120)));
      res.locals.page.start_date = functions.dateToStdString(new Date(new Date().setFullYear(dateToday.getFullYear() - 18)));
      return res.render('pages/account/register');
    },
  };
};