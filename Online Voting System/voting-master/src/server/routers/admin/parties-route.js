module.exports = function(app, controllers, options) {
  const {
    admin,
    parties,
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
   
  app.get('/admin/parties/', parties.goToParties);
  
  app.get('/admin/parties/create/', parties.goToCreateParty);
  app.post('/admin/parties/create/', parties.createParty);

  app.get('/admin/parties/new/', parties.goto_new_party);
  app.post('/admin/parties/new/', parties.new_party);

  app.get('/admin/parties/:id/', parties.goto_view_party);

  app.get('/admin/parties/:id/edit/', parties.goto_edit_party);
  app.post('/admin/parties/:id/edit/', parties.edit_party);

  app.get('/admin/parties/:id/archive/', parties.goto_archive_party);
  app.post('/admin/parties/:id/archive/', parties.archive_party);
};
