const constants = require('../../config/constants');
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    goToParties(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'View Parties';
      res.locals.page.id = 'view-parties';
      const fields = ['id', 'name', 'picture'];
      data.getAllParties().then((parties) => {
        res.locals.page.title = 'View Parties';
        res.locals.page.id = 'view-parties';

        res.locals.page.entries = blox.entries(parties, res.locals.settings, fields, 'parties');
        return res.render('templates/blox-main');
      });
    },

    goto_view_party(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'View Party';
      res.locals.page.id = 'view-party';
      const redirct = '/admin/parties/';
      const partyId = req.params.id;
      const id = parseInt(partyId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getParty(id).then((party) => {
          return res.render('pages/admin/parties/party/view', { party });
        });
      }
    },

    goto_edit_party(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Edit Party';
      res.locals.page.id = 'edit-party';
      const redirct = '/admin/parties/';
      const partyId = req.params.id;
      const id = parseInt(partyId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getParty(id).then((party) => {
          return res.render('pages/admin/parties/party/edit', { party });
        });
      }
    },

    goto_archive_party(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Archive Party';
      res.locals.page.id = 'archive-party';
      const redirct = '/admin/parties/';
      const partyId = req.params.id;
      const id = parseInt(partyId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getParty(id).then((party) => {
          return res.render('pages/admin/parties/party/archive', { party });
        });
      }
    },

    goto_new_party(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'New Party';
      res.locals.page.id = 'new-party';
      console.log(req.body);
      return res.render('pages/admin/parties/party/new');
    },

    edit_party(req, res) {
      res.locals.globals.admin_subdomain = true;
      console.log(req.body);
      const id = req.body.id;
      delete req.body.id;
      data.editParty(id, req.body).then((party) => {
        if (!party) {
          throw new Error('Error updating.');
        }
        return res.send('Party' + party.name + ' was edited successfully!');
      }).catch((error) => {
        return res.status(400).send(error.message);
      });
    },

    archive_party(req, res) {
      res.locals.globals.admin_subdomain = true;
      console.log(req.body);
      return res.status(400).send('Not implemented');
    },

    new_party(req, res) {
      res.locals.globals.admin_subdomain = true;
      data.newParty(req.body)
          .then((admin) => {
            if (!admin) {
              throw new Error('Party was not created. Please try again.');
            }

            res.send('Party successfully created');
          }).catch((error) => {
            res.status(400).send(error.message);
          });
    },

    goToCreateParty(req, res) {
      res.locals.globals.admin_subdomain = true;
      console.log(req.body);
      return res.render('pages/admin/parties/create');
    },

    createParty(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Create Party';
      res.locals.page.id = 'create-party';
      const {name} = req.body;

      data.createParty(name).then((party) => {
        if (!party) {
          throw new Error('Party was not created. Please try again!');
        }

        return res.send(`Party '${party.name}' was created successfully!`);
      }).catch((error) => {
        return res.status(400).send(error.message);
      });
    },
  };
};
