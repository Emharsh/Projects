module.exports = function(app, controllers, options) {
  const {
    admin,
    statistics,
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

  app.get('/admin/statistics/', statistics.goto_statistics);

};