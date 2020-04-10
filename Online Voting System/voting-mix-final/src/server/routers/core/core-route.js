module.exports = function(app, controllers, options) {
  const {main} = controllers;
  const {config} = options;

  if (!config.isVotingService) {
    return;
  }

  app.get('/', main.goto_index);
  app.get('/about/', main.goto_about);
  app.get('/results/', main.goto_results);
  app.get('/parties/', main.goto_parties);
  app.get('/postcodes/', main.goto_postcodes);
};
