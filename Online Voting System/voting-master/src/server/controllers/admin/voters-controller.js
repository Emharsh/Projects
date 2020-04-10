const constants = require('../../config/constants');
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    goto_voters(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'View Voters';
      res.locals.page.id = 'view-voters';

      const {nin, postcode} = req.query;

      const query = {nin: '', postcode: ''};
      if (nin !== undefined) {
        query.nin = nin.toString().toUpperCase();
      }
      if (postcode !== undefined) {
        query.postcode = postcode.toString().toUpperCase();
      }

      if (query.nin !== '' || query.postcode !== '') {
        data.getVoters(query)
            .then((voters) => {
              return res.render('pages/admin/voters/index',
                  {voters});
            });
      } else {
        data.getAllVoters().then((voters) => {
          return res.render('pages/admin/voters/index', {voters});
        });
      }
    },

    goto_view_voter(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'View Voter';
      res.locals.page.id = 'view-voter';
      const redirct = '/admin/voters/';
      const voterId = req.params.id;
      const id = parseInt(voterId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getVoterRegionsById(id).then((voter) => {
          console.log(voter);
          return res.render('pages/admin/voters/voter/view', {voter});
        });
      }
    },

    goto_edit_voter(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Edit Voter';
      res.locals.page.id = 'edit-voter';
      const redirct = '/admin/voters/';
      const voterId = req.params.id;
      const id = parseInt(voterId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getVoterById(id).then((voter) => {
          voter.dob = functions.dateToStdString(voter.dob);
          return res.render('pages/admin/voters/voter/edit', {voter});
        });
      }
    },

    goto_archive_voter(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Archive Voter';
      res.locals.page.id = 'archive-voter';
      const redirct = '/admin/voters/';
      const voterId = req.params.id;
      const id = parseInt(voterId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getVoterById(id).then((voter) => {
          return res.render('pages/admin/voters/voter/archive', {voter});
        });
      }
    },

    goto_confirm_voter(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Confirm Voter';
      res.locals.page.id = 'confirm-voter';
      const redirct = '/admin/voters/';
      const voterId = req.params.id;
      const id = parseInt(voterId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getVoterById(id).then((voter) => {
          return res.render('pages/admin/voters/voter/confirm', {voter});
        });
      }
    },

    goto_new_voter(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'New Voter';
      res.locals.page.id = 'new-voter';
      return res.render('pages/admin/voters/voter/new');
    },

    edit_voter(req, res) {
      res.locals.globals.admin_subdomain = true;
      console.log(req.body);
      const id = req.body.id;
      delete req.body.id;
      data.editVoter(id, req.body).then((voter) => {
        if (!voter) {
          throw new Error('Error updating.');
        }
        return res.send('Voter ' + voter.id + ' was edited successfully!');
      }).catch((error) => {
        return res.status(400).send(error.message);
      });
    },

    confirm_voter(req, res) {
      res.locals.globals.admin_subdomain = true;
      const response = functions.genOidAndPAT();
      return res.status(400).send(response);
    },

    setVoterOid(req, res) {
      res.locals.globals.admin_subdomain = true;
      const {encOidDbId} = req.body;
      const voterId = req.params.id;
      const id = parseInt(voterId);
      if (isNaN(id)) {
        return res.status(400).send('Error: Invalid request');
      } else {
        const updateData = {
          enc_onlineidentity_id: JSON.stringify(encOidDbId),
        };
        data.updateVoterByID(id, updateData)
            .then((result) => {
              return res.status(200).send('Success');
            })
            .error((error) => {
              return res.status(400).send('Error: ' + error);
            });
      }
    },

    archive_voter(req, res) {
      res.locals.globals.admin_subdomain = true;
      return res.status(400).send('Not implemented');
    },

    new_voter(req, res) {
      res.locals.globals.admin_subdomain = true;
      return res.status(400).send('Not implemented');
    },

    refresh_voter(req, res) {
      res.locals.globals.admin_subdomain = true;
      const voterId = req.params.id;
      const id = parseInt(voterId);
      if (isNaN(id)) {
        return res.status(400).send('Error: Invalid request: ' + req.params);
      } else {
        data.getVoterById(id).then((voter) => {
          const url = constants.MAP_IT_API.getPostcodeInfoUrl(voter.postcode);
          console.log(url);
          functions.ajaxRequest(url, updateVoterRegions);
        }).catch((error) => {
          message =
                'An error occurred while preregistering. ' +
                'Please try again later' + error;
          res.status(400).json({error: message});
        });
      }

      // eslint-disable-next-line require-jsdoc
      function updateVoterRegions(resp) {
        let message;
        if (resp) {
          data.createVoterRegions(resp, id).then(() => {
            res.sendStatus(200);
          }).catch((error) => {
            if (error.code == 'ER_DUP_ENTRY') {
              message = 'You have already registered.';
            } else {
              message =
                  'An error occurred while preregistering. ' +
                  'Please try again later' + error;
            }

            res.status(400).json({error: message});
          });
        } else {
          message =
            'An error occurred while preregistering. ' +
            'Please try again later';
          res.status(400).json({error: message});
        }
      }
    },

    goToCheckForVotingRecord(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Check for voting record';
      res.locals.page.id = 'check-voting-record';
      const fields = ['id', 'name'];
      data.getAllElectionsSlim(fields).then((elections) => {
        return res.render(
            'pages/admin/voters/check-for-voting-record',
            {elections}
        );
      });
    },

    checkForVotingRecord(req, res) {
      const {
        nin,
        electionId: electionIdString,
      } = req.body;
      const electionId = parseInt(electionIdString);
      if (!nin || isNaN(electionId)) {
        return res.status(400).send('Invalid request');
      }

      data.getVoter(nin).then((voter) => {
        if (!voter) {
          return Promise.resolve(false);
        } else {
          return data.getVotingRecord(voter.id, electionId);
        }
      }).then((votingRecord) => {
        if (votingRecord) {
          res.status(403)
              .send('Voter has already voted online in this election');
          return;
        }

        res.sendStatus(200);
      }).catch((error) => {
        res.status(400).send(error.message);
      });
    },
    searchPreregistered(req, res) {
      res.locals.globals.admin_subdomain = true;
      return res.render('pages/admin/voters/voter/search');
    },

    validationOrRegistration(req, res) {
      res.locals.globals.admin_subdomain = true;
      const {nin} = req.body;

      data.getVoter(nin)
          .then((voter) => {
            return res.render('pages/admin/voters/voter/validate',
                {voter, searchedNino: nin});
          });
    },
    generateOidAndPAT(req, res) {
      res.locals.globals.admin_subdomain = true;
      // Add validation, check for missing values, etc.
      const {
        dobYear,
        dobMonth,
        dobDay,
        nin,
        zip,
      } = req.body;

      // Months 0-based in javascript, so subtract one
      const dob = new Date(dobYear, dobMonth - 1, dobDay);

      data.getVoter(nin)
          .then((voter) => {
            if (!voter) {
              return data.createVoter(nin, dob, zip);
            }

            return data.updateVoter(voter, {dob: dob, postcode: zip});
          })
          .then((voter) => {
            res.render('pages/admin/voters/voter/generate',
                {voter});
          })
          .error(() => {
            // handle possible errors when updating/inserting the object
            // go to error page in the future
            res.sendStatus(400);
          });
    },
    returnPATLetterTemplate(req, res) {
      res.locals.globals.admin_subdomain = true;
      return res.render('pages/admin/voters/voter/pat');
    },
    setVoterEncOid(req, res) {
      res.locals.globals.admin_subdomain = true;
      const {
        nino,
        encOidDbId,
      } = req.body;

      const updateData = {
        enc_onlineidentity_id: JSON.stringify(encOidDbId),
      };

      data.updateVoterByNino(nino, updateData)
          .then((result) => {
            return res.sendStatus(200);
          })
          .error((error) => {
            return res.sendStatus(400);
          });
    },
    registerOid(req, res) {
      res.locals.globals.admin_subdomain = true;
      const oid = req.body;

      return data.createOnlineIdentity(oid, true)
          .then((onlineIdentity) => {
            res.json({dbId: onlineIdentity.id});
          })
          .catch((error) => {
            res.sendStatus(400);
          });
    },

  };
};
