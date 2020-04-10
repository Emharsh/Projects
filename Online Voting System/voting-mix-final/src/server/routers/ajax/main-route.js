module.exports = function(app, controllers, options) {
  const {
    ajax,
  } = controllers;

  app.all('/ajax/vote/', ajax.vote);
  app.all('/ajax/loginadmin/', ajax.login_admin);
};
