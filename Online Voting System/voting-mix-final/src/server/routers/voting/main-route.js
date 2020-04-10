module.exports = function(app, controllers, options) {
  const {account, votingAuth, votingMain} = controllers;
  const {config} = options;

  if (!config.isVotingService) {
    return;
  }

  app.get('/account/', account.goto_account);
  app.get('/account/register/', account.goto_register);
  app.get('/account/logout/', account.goto_logout);

  app.get('/account/login/', account.goto_login);
  app.post('/account/login/', votingAuth.login);

  app.get('/vote/', votingMain.listAvailableElections);
  app.get('/vote/:id/', votingMain.displayBallotForElection);

  app.post('/vote/', votingMain.vote);
};
