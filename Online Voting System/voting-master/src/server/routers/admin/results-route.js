module.exports = function(app, controllers, options) {
  const {
    admin,
    results,
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

  app.get('/admin/results/', results.goto_results);

  app.get('/admin/results/:id/', results.goto_view_result);

};