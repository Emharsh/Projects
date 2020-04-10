// Config file for app

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const join = require('path').join;
const settings = require('../settings');
const globals = require('../../utils/globals');
const connLogger = require('../../utils/connection-logger');


/**
 * @export
 * @param {*} params
 * @return {Express.Application}
 */
module.exports = function(params) {
  const {config} = params;

  const app = express(); // Setting the app to express middleware

  app.set('view engine', 'ejs'); // set the view engine to ejs

  // view folder (files that the view engine uses)
  app.set('views', join(__dirname, '/../../views'));
  // static/public folder (images, css and other static files)
  app.use('/static', express.static('./src/public'));
  app.use(cookieParser()); // set cookie parser
  // set bodyParser urlencoded extended
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({ limit: '100mb' })); // set bodyParser json

  if (config.isAuthService) {
    app.use(cors({
      optionsSuccessStatus: 200,
    }));
  }

  // TODO: Change app secret for production
  const sess = {
    secret: 'TemporaryAppSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: null,
    },
  };

  app.use(session(sess));

  const inc = join(__dirname, "/../../views/partials/");

  app.use(globals(settings, config, inc));

  app.use(connLogger);

  return app;
};
