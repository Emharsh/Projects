const constants = require('../../config/constants');
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    goto_candidates(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'View Candidates';
      res.locals.page.id = 'view-candidates';
      const fields = ['id', 'name', 'picture', 'picture_url'];
      const subfields = {party: ['name']};
      data.getAllCandidates(fields).then((candidates) => {
        res.locals.page.entries = blox.entries(candidates, res.locals.settings, fields, 'candidates', subfields);
        return res.render('templates/blox-main');
      });
    },

    goto_view_candidate(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'View Candidate';
      res.locals.page.id = 'view-candidate';
      const redirct = '/admin/candidates/';
      const candidateId = req.params.id;
      const id = parseInt(candidateId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getCandidate(id).then((candidate) => {
          return res.render('pages/admin/candidates/candidate/view', { candidate });
        });
      }
    },

    goto_edit_candidate(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Edit Candidate';
      res.locals.page.id = 'edit-candidate';
      const redirct = '/admin/candidates/';
      const candidateId = req.params.id;
      const id = parseInt(candidateId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getCandidate(id).then((candidate) => {
          data.getAllParties().then((parties) => {
            return res.render('pages/admin/candidates/candidate/edit', { candidate, parties });
          });
        });
      }
    },

    goto_archive_candidate(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Archive Candidate';
      res.locals.page.id = 'archive-candidate';
      const redirct = '/admin/candidates/';
      const candidateId = req.params.id;
      const id = parseInt(candidateId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getCandidate(id).then((candidate) => {
          return res.render('pages/admin/candidates/candidate/archive', { candidate });
        });
      }
    },

    goto_new_candidate(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'New Candidate';
      res.locals.page.id = 'new-candidate';
      data.getAllParties().then((parties) => {
        return res.render('pages/admin/candidates/candidate/new', { parties });
      });
    },
    
    edit_candidate(req, res) {
      res.locals.globals.admin_subdomain = true;
      console.log(req.body);
      const id = req.body.id;
      delete req.body.id;
      data.editCandidate(id, req.body).then((candidate) => {
        if (!candidate) {
          throw new Error('Error updating.');
        }
        return res.send('Candidate' + candidate.name + ' was created successfully!');
      }).catch((error) => {
        return res.status(400).send(error.message);
      });
    },

    archive_candidate(req, res) {
      res.locals.globals.admin_subdomain = true;
      return res.status(400).send('Not implemented');
    },

    new_candidate(req, res) {
      res.locals.globals.admin_subdomain = true;
      data.newCandidate(req.body).then((candidate) => {
        if (!candidate) {
          throw new Error('Candidate was not created. Please try again!');
        }

        return res.send(`Candidate ${candidate.name} created successfully!`);
      }).catch((error) => {
        res.status(400).send(error.message);
      });

    },

    goToCreateCandidate(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Create Candidate';
      res.locals.page.id = 'create-candidate';
      data.getAllParties().then((parties) => {
        return res.render('pages/admin/candidates/create', {parties});
      });
    },

    createCandidate(req, res) {
      const {
        name,
        party: partyIdString,
        pictureUrl,
      } = req.body;

      let partyId = null;
      if (partyIdString) {
        partyId = parseInt(partyIdString);
      }

      data.createCandidate(name, partyId, pictureUrl).then((candidate) => {
        if (!candidate) {
          throw new Error('Candidate was not created. Please try again!');
        }

        return res.send(`Candidate ${candidate.name} created successfully!`);
      }).catch((error) => {
        res.status(400).send(error.message);
      });
    },
  };
};
