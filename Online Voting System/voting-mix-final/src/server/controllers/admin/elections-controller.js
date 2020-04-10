const constants = require('../../config/constants');
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {

    goto_list_elections(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'List Elections';
      res.locals.page.id = 'list-elections';
      const fields = ['id', 'name', 'start_date', 'end_date'];
      const subfields = { electoralRegion: ['name'], electionTypes: ['name'] };
      data.getAllElectionsSlim(fields).then((elections) => {
        console.log(elections);
        res.locals.page.entries = blox.entries(elections, res.locals.settings, fields, 'elections', subfields);
        return res.render('templates/blox-main');
      }); 
    },

    goto_view_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      const redirct = '/admin/elections/';
      const electionId = req.params.id;
      const id = parseInt(electionId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getElectionById(id).then((election) => {
          console.log(election.electionCandidates);
          if (!election) {
            return res.redirect(redirct);
          } else {
            return res.render('pages/admin/elections/election/view', { election });
          }
        });
      }
    },

    goto_edit_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Edit Election';
      res.locals.page.id = 'edit-election';
      const redirct = '/admin/elections/';

      const electionId = req.params.id;
      const id = parseInt(electionId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getElectionById(id).then((election) => {
          if (!election) {
            return res.redirect(redirct);
          } else {
            election.start_date = functions.datetimeToStdString(election.start_date);
            election.end_date = functions.datetimeToStdString(election.end_date);
            data.getElectoralRegions().then((regions) => {
              data.getElectionTypes().then((types) => {
                return res.render('pages/admin/elections/election/edit', { election, regions, types });
              });
            });
          }
        });
      }
    },

    goto_end_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'End Election';
      res.locals.page.id = 'end-election';
      const redirct = '/admin/elections/';

      const electionId = req.params.id;
      const id = parseInt(electionId);
      if (isNaN(id)) {
        return res.redirect(redirct); 
      } else {
        data.getElectionById(id).then((election) => {
          if (!election) {
            return res.redirect(redirct);
          } else {
            return res.render('pages/admin/elections/election/end', { election });
          }
        });
      }
    },

    goto_archive_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Archive Election';
      res.locals.page.id = 'archive-election';
      const redirct = '/admin/elections/';

      const electionId = req.params.id;
      const id = parseInt(electionId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getElectionById(id).then((election) => {
          if (!election) {
            return res.redirect(redirct);
          } else {
            return res.render('pages/admin/elections/election/archive', { election });
          }
        });
      }
    },

    goto_new_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'New Election';
      res.locals.page.id = 'new-election';
      data.getElectoralRegions().then((regions) => {
        data.getElectionTypes().then((types) => {
          return res.render('pages/admin/elections/election/new', { regions, types });
        });
      });
    },

    edit_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      console.log(req.body);
      const id = req.body.id;
      delete req.body.id;
      let groups = (req.body['start-date'] + '-' + req.body['start-time']).match(/\d+/g);
      const start_date = new Date(groups[0], groups[1] - 1, groups[2], groups[3], groups[4]);
      groups = (req.body['end-date'] + '-' + req.body['end-time']).match(/\d+/g);
      const end_date = new Date(groups[0], groups[1] - 1, groups[2], groups[3], groups[4]);
      const updateData = {
        name: req.body.name,
        end_date, start_date,
        type: req.body.type,
        electoral_regions_id: req.body.electoral_regions_id
      };

      data.editElection(id, updateData).then((election) => {
        if (!election) {
          throw new Error('Error updating.');
        }
        return res.send('Election' + election.name + ' was created successfully!');
      }).catch((error) => {
        return res.status(400).send(error.message);
      });
    },

    end_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      return res.status(400).send('Not implemented');
    },

    archive_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      return res.status(400).send('Not implemented');
    },

    new_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      const {
        name,
        type,
        postcodes,
        master_key,
        electoral_regions_id,
      } = req.body; 
      const masterKey = JSON.parse(master_key);
      console.log(req.body);
      console.log(masterKey);
      cryptoUtils.jwKeyToPem(masterKey)
        .then((masterKeyPem) => {
          console.log(masterKeyPem);
          let groups = (req.body['start-date'] + '-' + req.body['start-time']).match(/\d+/g);
          const start_date = new Date(groups[0], groups[1] - 1, groups[2], groups[3], groups[4]);
          groups = (req.body['end-date'] + '-' + req.body['end-time']).match(/\d+/g);
          const end_date = new Date(groups[0], groups[1] - 1, groups[2], groups[3], groups[4]);

          return data.newElection({
            name,
            type,
            start_date,
            end_date,
            postcodes,
            electoral_regions_id,
            master_key: masterKeyPem,
          });
      }).then((election) => {
        if (!election) {
          throw new Error('Election was not created. Please try again');
        }

        return res.send('Election created successfully');
      }).catch((error) => {
        return res.status(400).send({ message: error.message });
      });
    },

    goto_redirect_base(req, res) {
      return res.redirect('/admin/elections/');
    },

    goToCreateElection(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Create Elections';
      res.locals.page.id = 'create-elections';
      data.getAllCandidates().then((candidates) => {
        return res.render('pages/admin/elections/election/create', {candidates});
      });
    },

    createElection(req, res) {
      const {
        name,
        startYear,
        startDay,
        startMonth,
        masterKey,
        candidateIds,
        regions,
      } = req.body;

      Promise.all([
        data.getCandidatesByIds(candidateIds.map(Number)),
        cryptoUtils.jwKeyToPem(masterKey),
      ]).then((result) => {
        const [candidates, masterKeyPem] = result;
        if (!candidates || candidates.length < 2) {
          throw new Error('Not enough candidates! Please add more than two.');
        }

        if (!masterKeyPem) {
          throw new Error('Invalid master key');
        }
        const startDate = new Date(startYear, startMonth - 1, startDay);
        const endDate = new Date(startYear,
            startMonth - 1,
            startDate.getDate() + 7
        );

        return data.createElection(
            name,
            startDate,
            endDate,
            constants.ELECTION_TYPE.FPP,
            masterKeyPem,
            candidates,
            regions
        );
      }).then((election) => {
        if (!election) {
          throw new Error('Election was not created. Please try again');
        }

        return res.send('Election created successfully');
      }).catch((error) => {
        return res.status(400).send({message: error.message});
      });
    },

    goto_populate_elections(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Populate Elections';
      res.locals.page.id = 'populate-elections';
      return res.render('pages/admin/elections/pop');
    },

    goto_select_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Select Elections';
      res.locals.page.id = 'select-elections';
      return res.render('pages/admin/elections/select');
    },
  };
};
