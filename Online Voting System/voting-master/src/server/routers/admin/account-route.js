module.exports = function(app, controllers, options) {
  const {
    admin,
    adminAcc,
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
  
  app.get('/admin/account/', adminAcc.goto_account);
  
  app.get('/admin/account/logout/', adminAcc.goto_logout);

  app.get('/admin/account/login/', adminAcc.goto_login);
  app.post('/admin/account/login/', adminAuth.login);

};
