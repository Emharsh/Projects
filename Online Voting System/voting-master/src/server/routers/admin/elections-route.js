module.exports = function(app, controllers, options) {
  const {
    admin,
    elections,
    adminAuth,
  } = controllers;

  const {
    config,
  } = options;

  if (!config.isAdminService) {
    return;
  }

  // move admin related controller methods to admin controller
  // and remove /admin prefix
  if (!config.isDevEnv) {
    app.get('/', admin.goto_index);
  }

  app.get('/admin/elections/', elections.goto_list_elections);   
  app.get('/admin/elections/create/', elections.goToCreateElection);
  app.post('/admin/elections/create/', elections.createElection);
  
  app.get('/admin/elections/select/', elections.goto_select_election);

  app.get('/admin/elections/new/', elections.goto_new_election);
  app.post('/admin/elections/new/', elections.new_election);

  app.get('/admin/elections/pop/', elections.goto_populate_elections);

  app.get('/admin/elections/:id/', elections.goto_view_election);

  app.get('/admin/elections/:id/edit/', elections.goto_edit_election);
  app.post('/admin/elections/:id/edit/', elections.edit_election);

  app.get('/admin/elections/:id/end/', elections.goto_end_election);
  app.post('/admin/elections/:id/end/', elections.end_election);

  app.get('/admin/elections/:id/archive/', elections.goto_archive_election);
  app.post('/admin/elections/:id/archive/', elections.archive_election);

  app.get('/admin/elections/:id/candidates/', elections.goto_edit_election_candidates);
  app.post('/admin/elections/:id/candidates/', elections.edit_election_candidates);
};