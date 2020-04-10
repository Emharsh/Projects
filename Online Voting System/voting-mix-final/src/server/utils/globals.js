// Globals
/**
 *
 *
 * @param {*} settings
 * @param {*} config
 * @param {*} inc
 * @return {function}
 */
function globals(settings, config, inc) {
  /**
  * @param {*} req
  * @param {*} res
  * @param {*} next
  * @return {void}
  */
  return function globals(req, res, next) {

    const startGlobals = {
      inc: inc,
      head: 'head.ejs',
      header: 'header.ejs',
      title: 'title.ejs',
      footer: 'footer.ejs',
      blox: 'blox.ejs',
      is_loggedin_general: false,
      is_loggedin_admin: false,
      admin_subdomain: false,
    };

    const page = {
      title: '',
      subtitle: '',
      id: '',
      data: false,
      entries: false,
      buttons: false,
      action: './',
      completed: './',
    };

    const globals = startGlobals;

    res.locals.authServiceUrl = config.authServiceUrl;

    globals.is_loggedin_general = req.session && req.session.voter;
    globals.is_loggedin_admin = req.session && req.session.admin;

    if (globals.is_loggedin_admin) {
      res.locals.admin = req.session.admin;
    }
    
    res.locals.config = config;
    res.locals.settings = settings;
    res.locals.globals = globals;
    res.locals.page = page;

    next();

  }
};

module.exports = globals;
