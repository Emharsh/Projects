module.exports = function(app, controllers, options) {
  const {
    auth,
  } = controllers;

  const {
    config,
  } = options;

  if (!config.isAuthService) {
    return;
  }

  app.post('/preregister/', auth.preregister);
  app.post('/generate-voting-token/', auth.generateVotingToken);
  app.post('/voting-token-info/', auth.votingTokenInfo );
  app.post('/mark-voting-token-used-in-election/',
      auth.markVotingTokenUsedInElection);
};
