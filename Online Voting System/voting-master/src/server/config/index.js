const knexConfig = require('../../../knexfile');
const constants = require('./constants');

const environment = process.env.NODE_ENV || 'development';
// possible values for 'serviceType': 'voting', 'auth', 'admin', 'development'
const serviceType = process.env.SERVICE_TYPE ||
  (environment !== 'production' ? 'development': environment);
const authServiceUrl = process.env.AUTH_SERVICE_URL || '';
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || process.env.npm_package_config_port || 8080;

const votingServicePrivateKey = process.env.VOTING_SERVICE_PK ||
`-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIEsbAWJFGikcx8Mh21GQbZHSMnX7+BorR6vC+uB4448roAoGCCqGSM49
AwEHoUQDQgAExQXeOhUtK8oFX0Lor9VNS+8rq0ZDlQgt4yU28C0Ad3kAc61vOZ8g
FQw5ZoYi4aileFy8qO4kjhb3hTeRce6yjg==
-----END EC PRIVATE KEY-----`;
const votingServicePublicKey = process.env.VOTING_SERVICE_PBK ||
`-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExQXeOhUtK8oFX0Lor9VNS+8rq0ZD
lQgt4yU28C0Ad3kAc61vOZ8gFQw5ZoYi4aileFy8qO4kjhb3hTeRce6yjg==
-----END PUBLIC KEY-----
`;

const args = { silent: false, verbose: false, debug: false, compact: false, readonly: false}

for (var i = 2; i < process.argv.length; ++i) {
  var arg = process.argv[i];
  if (arg === "silent" || arg === "s") { args.silent = true; }
  else if (arg === "verbose" || arg === "v") { args.verbose = true; }
  else if (arg === "debug" || arg === "d") { args.debug = true; }
  else if (arg === "compact" || arg === "c") { args.compact = true; }
  else if (arg === "readonly" || arg === "r") { args.readonly = true; }
  else if (arg === "help" || arg === "h" || arg === "?") { help(0); }
}

module.exports = {
  environment,
  authServiceUrl,
  port,
  votingServicePrivateKey,
  votingServicePublicKey,
  fullAuthServiceUrl: authServiceUrl || 'http://localhost:' + port,
  ip: process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
  knex: knexConfig[environment],
  serviceType,
  isAuthService: serviceType === constants.SERVICE_TYPE.AUTH ||
    serviceType === constants.SERVICE_TYPE.DEV,
  isAdminService: serviceType === constants.SERVICE_TYPE.ADMIN ||
    serviceType === constants.SERVICE_TYPE.DEV,
  isVotingService: serviceType === constants.SERVICE_TYPE.VOTING ||
    serviceType === constants.SERVICE_TYPE.DEV,
  isDevEnv: serviceType === constants.SERVICE_TYPE.DEV,
  args,
};
