module.exports = function(app, controllers, options) {
  const {
    admin,
    voters,
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
  app.get('/admin/voters/', voters.goto_voters);

  app.get('/admin/voters/new/', voters.goto_new_voter);
  app.post('/admin/voters/new/', voters.new_voter);

  app.get('/admin/voters/search/', voters.searchPreregistered);

  app.get('/admin/voters/:id/', voters.goto_view_voter);

  app.get('/admin/voters/:id/edit/', voters.goto_edit_voter);
  app.post('/admin/voters/:id/edit/', voters.edit_voter);

  app.get('/admin/voters/:id/archive/', voters.goto_archive_voter);
  app.post('/admin/voters/:id/archive/', voters.archive_voter);

  app.get('/admin/voters/:id/confirm/', voters.goto_confirm_voter);
  app.post('/admin/voters/:id/confirm/', voters.confirm_voter);

  app.post('/admin/voters/:id/confirm/validate/', voters.validationOrRegistration);
  app.put('/admin/voters/:id/confirm/setOid/', voters.setVoterOid);
  app.post('/admin/voters/:id/confirm/generate/', voters.generateOidAndPAT);
  app.post('/admin/voters/:id/confirm/register/', voters.registerOid);

  app.post('/admin/voters/:id/refresh/', voters.refresh_voter);

  app.get('/admin/templates/pat/', voters.returnPATLetterTemplate);

  app.get('/admin/check-for-voting-record', voters.goToCheckForVotingRecord);
  app.post('/admin/check-for-voting-record', voters.checkForVotingRecord);
};
