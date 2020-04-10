module.exports = function(app, controllers, options) {
  const {
    admin,
    managment,
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
  app.get('/admin/management/', managment.goto_management);

  app.get('/admin/management/create/', managment.goto_management_create);
  app.post('/admin/management/create/', adminAuth.register);

  app.get('/admin/management/new/', managment.goto_new_admin);
  app.post('/admin/management/new/', managment.new_admin);

  app.get('/admin/management/:id/', managment.goto_view_admin);

  app.get('/admin/management/:id/edit/', managment.goto_edit_admin);
  app.post('/admin/management/:id/edit/', managment.edit_admin);

  app.get('/admin/management/:id/archive/', managment.goto_archive_admin);
  app.post('/admin/management/:id/archive/', managment.archive_admin);
};
