// Connection Logger
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {void}
 */
function connLogger(req, res, next) {
  let ip = req.headers['x-forwarded-for']
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || (req.connection.socket ? req.connection.socket.remoteAddress : null);

  ip = ip ? ip.toString() : '';
  const referrer = req.header('referrer') ?
    req.header('referrer').toString() : '';
  const agent = req.header('user-agent') ?
    req.header('user-agent').toString() : '';
  const params = req.params ? JSON.stringify(req.params) : '';
  const query = req.query ? JSON.stringify(req.query) : '';
  const path = req.path ? req.path.toString() : '';
  const route = req.route ? req.route.toString() : '';
  const host = req.headers.host ? req.headers.host.toString() : '';
  // let signedCookies = req.signedCookies ? req.signedCookies.toString() : "";
  // let cookies = req.cookies ? req.cookies.toString() : "";


  if (res.locals.config.args.verbose) {
    let format = res.locals.settings.consoleFormat;
    let a = format.fore.Green;
    let b = format.fore.Red;
    let R = format.funct.Reset;
    let logconsole =
      a + 'Ip: ' + b + ip +
      a + ', Referrer: ' + b + referrer +
      a + ', Agent: ' + b + agent +
      a + ', Params: ' + b + params +
      a + ', Query: ' + b + query +
      a + ', Path: ' + b + path +
      a + ', Route: ' + b + route +
      a + ', Host: ' + b + host;

    logconsole +=R;
    console.log(logconsole);
  }
  
  if (res.locals.config.args.readonly) {
    const logFile =
      'Ip: ' + ip +
      ', Referrer: ' + referrer +
      ', Agent: ' + agent +
      ', Params: ' + params +
      ', Query: ' + query +
      ', Path: ' + path +
      ', Route: ' + route +
      ', Host: ' + host;
    // ", SignedCookies: " + signedCookies +
    // ", Cookies: " + cookies

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const filename = 'connections-' + yyyy + '-' + mm + '-' + dd + '.log';
    const dir = res.locals.settings.locations.logs;

    logFile +='\r\n';

    const fs = require('fs');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.appendFile(dir + filename, logFile, function (err) {
      if (err) throw err;
    });
  }
  return next(); // Passing the request to the next handler in the stack.
};

module.exports = connLogger;
