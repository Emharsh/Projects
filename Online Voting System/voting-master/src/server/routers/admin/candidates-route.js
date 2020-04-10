module.exports = function(app, controllers, options) {
  const {
    admin,
    candidates,
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
  
  app.get('/admin/candidates/', candidates.goto_candidates);
  
  app.get('/admin/candidates/create/', candidates.goToCreateCandidate);
  app.post('/admin/candidates/create/', candidates.createCandidate);

  app.get('/admin/candidates/new/', candidates.goto_new_candidate);
  app.post('/admin/candidates/new/', candidates.new_candidate);

  app.get('/admin/candidates/:id/', candidates.goto_view_candidate);

  app.get('/admin/candidates/:id/edit', candidates.goto_edit_candidate);
  app.post('/admin/candidates/:id/edit', candidates.edit_candidate);

  app.get('/admin/candidates/:id/archive/', candidates.goto_archive_candidate);
  app.post('/admin/candidates/:id/archive/', candidates.archive_candidate);
};
