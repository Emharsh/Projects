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
      const subfields = {electionTypes: ['name'], electoralRegion: ['name']};
      data.getAllElectionsSlim(fields).then((elections) => {
        res.locals.page.entries = blox.entries(
            elections,
            res.locals.settings,
            fields,
            'elections',
            subfields
        );
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
            return res.render(
                'pages/admin/elections/election/view',
                {election}
            );
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
            election.start_date =
              functions.datetimeToStdString(election.start_date);
            election.end_date =
              functions.datetimeToStdString(election.end_date);
            data.getElectoralRegions().then((regions) => {
              data.getElectionTypes().then((types) => {
                return res.render(
                    'pages/admin/elections/election/edit',
                    {election, regions, types}
                );
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
            return res.render('pages/admin/elections/election/end', {election});
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
            return res.render(
                'pages/admin/elections/election/archive',
                {election}
            );
          }
        });
      }
    },

    goto_edit_election_candidates(req, res) {
      res.locals.globals.admin_subdomain = true;
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
            data.getAllCandidates().then((candidates) => {
              return res.render(
                  'pages/admin/elections/election/candidates',
                  {election, candidates}
              );
            });
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
          return res.render(
              'pages/admin/elections/election/new',
              {regions, types}
          );
        });
      });
    },

    edit_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      console.log(req.body);
      const id = req.body.id;
      delete req.body.id;
      let groups =
        (req.body['start-date'] + '-' + req.body['start-time']).match(/\d+/g);
      const startDate =
        new Date(groups[0], groups[1] - 1, groups[2], groups[3], groups[4]);
      groups =
        (req.body['end-date'] + '-' + req.body['end-time']).match(/\d+/g);
      const endDate =
        new Date(groups[0], groups[1] - 1, groups[2], groups[3], groups[4]);
      const electoralRegionsId = parseInt(req.body.electoral_regions_id);
      console.log(electoralRegionsId);
      if (isNaN(electoralRegionsId)) {
        return res.status(400).send(
            'invalid electoral regions id: ' + req.body.electoral_regions_id
        );
      } else {
        const updateData = {
          name: req.body.name,
          end_date: endDate,
          start_date: startDate,
          type: req.body.type,
          electoral_regions_id: electoralRegionsId,
        };

        data.editElection(id, updateData).then((election) => {
          if (!election) {
            throw new Error('Error updating.');
          }
          console.log(election);
          return res.send('Election ' + election + ' was edited successfully!');
        }).catch((error) => {
          return res.status(400).send(error.message);
        });
      }
    },

    end_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      const now = new Date();
      const {
        masterPrivateKey,
      } = req.body;

      const {id} = req.params;
      let responseSent = false;
      const electionId = parseInt(id);

      if (isNaN(electionId)) {
        return res.status(400).send('Election id not supplied');
      }

      if (!masterPrivateKey) {
        return res.status(400).send('Master key not provided');
      }

      Promise.all([
        data.getElectionByIdDeep(electionId),
        cryptoUtils.jwKeyToPem(masterPrivateKey, true),
      ]).then((result) => {
        const [election, masterPrivateKeyPem] = result;
        if (!election || !masterPrivateKeyPem) {
          throw new Error('Invalid details supplied');
        }

        if (election.private_master_key) {
          throw new Error('Election has already been ended');
        }

        const verificationString = cryptoUtils.randomHexString();

        return Promise.all([
          // check if private key is a pair with the public key
          cryptoUtils.rsaPKCS1OaepEncrypt(
              masterPrivateKeyPem,
              verificationString
          ).then((encryptedVerificationString) => {
            return cryptoUtils.rsaPKCS1OaepDecrypt(
                masterPrivateKeyPem,
                encryptedVerificationString
            );
          }).then((decryptedVerificationString) => {
            if (decryptedVerificationString !== verificationString) {
              return Promise.resolve(false);
            }

            return Promise.resolve(true);
          }).catch((_error) => {
            return Promise.resolve(false);
          }),
          election,
          masterPrivateKeyPem,
        ]);
      }).then((result) => {
        const [
          isMasterPrivateKeyValid,
          election,
          masterPrivateKeyPem,
        ] = result;

        if (!isMasterPrivateKeyValid) {
          throw new Error('Invalid master key provided');
        }

        const updateData = {
          private_master_key: masterPrivateKeyPem,
          end_date: now,
        };

        return Promise.all([
          data.updateElection(election.id, updateData),
          election,
        ]);
      }).then((result) => {
        const [updatedElection, election] = result;

        if (!updatedElection) {
          throw new Error('An error occurred while ending the election');
        }
        res.send(
            'Election ended. Results and statistics will be available shortly.'
        );
        responseSent = true;
        let promiseQueue = Promise.resolve();

        for (const ballot of election.ballots) {
          let ballotEncContent = ballot.enc_content;
          if (typeof ballotEncContent === 'string'
            || ballotEncContent instanceof String) {
            ballotEncContent = JSON.parse(ballotEncContent);
          }
          promiseQueue = promiseQueue.then(() => {
            return cryptoUtils.rsaPKCS1OaepDecrypt(
                updatedElection.private_master_key,
                ballot.enc_password
            ).then((decryptedBallotPassword) => {
              return cryptoUtils.decryptAES(
                  decryptedBallotPassword,
                  ballotEncContent.iv,
                  ballotEncContent.data,
                  ballotEncContent.authTag
              );
            }).then((ballotContentJson) => {
              if (!ballotContentJson) {
                throw new Error('Ballot content empty');
              }

              const ballotContent = JSON.parse(ballotContentJson);
              const {
                chosenElectionCandidateId,
              } = ballotContent;

              if (!chosenElectionCandidateId) {
                throw new Error('Spoiled ballot - do not count');
              }

              return Promise.all([
                data.getElectionCandidateById(chosenElectionCandidateId),
                ballotContent,
              ]);
            }).then((result) => {
              const [electionCandidate, ballotContent] = result;
              const ageGroup = ballotContent.ageGroup || 'Unknown';
              if (!electionCandidate) {
                throw new Error('Invalid ballot');
              }
              const results = electionCandidate.results || {};
              if (!results.hasOwnProperty('receivedVotes')) {
                results.receivedVotes = 0;
              }

              if (!results.hasOwnProperty('receivedVotesByAgeGroup')) {
                results.receivedVotesByAgeGroup = {};
              }

              if (!results.receivedVotesByAgeGroup.hasOwnProperty(ageGroup)) {
                results.receivedVotesByAgeGroup[ageGroup] = 0;
              }

              results.receivedVotes += 1;
              results.receivedVotesByAgeGroup[ageGroup] += 1;

              return data.updateElectionCandidate(
                  electionCandidate.id,
                  {results: JSON.stringify(results)}
              );
            }).then((updatedElectionCandidate) => {
              if (!updatedElectionCandidate) {
                throw new Error('Failed to count ballot');
              }
              return Promise.resolve();
            }).catch((error) => {
              console.log(error.message);
              return Promise.resolve();
            });
          });
        }
      }).catch((error) => {
        if (!responseSent) {
          res.status(400).send(error.message);
        }
      });
    },

    archive_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      return res.status(400).send('Not implemented');
    },

    edit_election_candidates(req, res) {
      res.locals.globals.admin_subdomain = true;
      const electionId = req.params.id;
      const id = parseInt(electionId);
      const candidates = req.body;
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        const electionCandidates = [];
        // eslint-disable-next-line guard-for-in
        for (const label in candidates) {
          matches = label.match(/\d+/g);
          console.log(label, matches);
          if (matches) {
            if (candidates[label]) {
              const candidateId = parseInt(matches[0]);
              const partyId = parseInt(matches[1]);
              electionCandidates.push({
                candidate_id: candidateId,
                current_party_id: partyId,
              });
            }
          }
        }
        const updateData = {id: id, electionCandidates: electionCandidates};
        console.log(updateData);
        data.editElectionCandidates(updateData).then((election) => {
          if (!election) {
            throw new Error('Error updating.');
          }
          console.log(election);
          return res.send(
              'Election ' + election.name + ' was updated successfully!'
          );
        }).catch((error) => {
          return res.status(400).send(error.message);
        });
      }
    },

    new_election(req, res) {
      res.locals.globals.admin_subdomain = true;
      const {
        name,
        type,
        postcodes,
        // eslint-disable-next-line camelcase
        master_key,
        // eslint-disable-next-line camelcase
        // electoral_regions_id,
      } = req.body;
      const masterKey = JSON.parse(master_key);
      console.log(req.body);
      console.log(masterKey);
      const electoralRegionsId = parseInt(req.body.electoral_regions_id);
      console.log(electoralRegionsId);
      if (isNaN(electoralRegionsId)) {
        return res.status(400).send(
            'invalid electoral regions id: ' + req.body.electoral_regions_id
        );
      } else {
        cryptoUtils.jwKeyToPem(masterKey).then((masterKeyPem) => {
          console.log(masterKeyPem);
          let groups =
            (req.body['start-date'] + '-' + req.body['start-time'])
                .match(/\d+/g);
          const startDate = new Date(
              groups[0], groups[1] - 1, groups[2], groups[3], groups[4]
          );
          groups =
            (req.body['end-date'] + '-' + req.body['end-time'])
                .match(/\d+/g);
          const endDate = new Date(
              groups[0],
              groups[1] - 1,
              groups[2],
              groups[3],
              groups[4]
          );
          const electoralRegionsId = parseInt(req.body.electoral_regions_id);

          return data.newElection({
            name,
            type,
            start_date: startDate,
            end_date: endDate,
            postcodes,
            electoral_regions_id: electoralRegionsId,
            master_key: masterKeyPem,
          });
        }).then((election) => {
          if (!election) {
            throw new Error('Election was not created. Please try again');
          }

          return res.send('Election created successfully');
        }).catch((error) => {
          return res.status(400).send({message: error.message});
        });
      }
    },

    goto_redirect_base(req, res) {
      return res.redirect('/admin/elections/');
    },

    goToCreateElection(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Create Elections';
      res.locals.page.id = 'create-elections';
      data.getAllCandidates().then((candidates) => {
        return res.render(
            'pages/admin/elections/election/create',
            {candidates}
        );
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
