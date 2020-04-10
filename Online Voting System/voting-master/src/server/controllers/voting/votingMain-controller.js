module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    name: 'votingMain',
    listAvailableElections(req, res) {
      res.locals.page.title = 'Elections';
      res.locals.page.id = 'voter-elections';
      console.log(req.session);
      if ((req.session && req.session.voter)) {
        if (req.session.voter.electoralRegionsNames && req.session.voter.electoralRegionsNames.length > 0) {
          data.getElectionsForVoter(
            req.session.voter.electoralRegionsNames
          ).then((elections) => {
            return res.render('pages/voting/vote', { elections, onlineIdentityId: req.session.voter.onlineIdentityId });
          });
        } else {
          return res.render('pages/account/index', { elections: undefined });
        }
      } else {
        res.redirect('/account/login/');
      }
    },
    displayBallotForElection(req, res) {
      res.locals.page.title = 'Ballot';
      res.locals.page.id = 'voter-ballot';
      if (req.session && req.session.voter) {
        let id = undefined;
        if (req.params) {
          if (req.params.electionId) {
            id = parseInt(req.params.electionId);
          } else if (req.params.id) {
            id = parseInt(req.params.id);
          }
        } else if (req.query) {
          if (req.query.electionId) {
            id = parseInt(req.query.electionId);
          } else if (req.query.id) {
            id = parseInt(req.query.id);
          }
        }

        if (isNaN(id)) {
          res.redirect('/vote/');
        } else {
          Promise.all([
            data.getElectionByIdDeep(id),
            data.getBallotFromOidForElection(
                req.session.voter.onlineIdentityId,
                id
            ),
          ]).then((result) => {
            const [election, castBallot] = result;
            const now = new Date();
            // if the voter tried to access an invalid election
            // or has already voted in the election, redirect to election list
            // TODO: add region constraint

            let msg = 'msg';
            if (castBallot) {
              msg = 'You have already voted in this election';
              res.redirect('/vote/post/?msg=' + msg);
            } else {
              if (election.start_date > now) {
                msg = 'That election has not begun yet.';
                res.redirect('/vote/?error=' + msg);
              } else if (election.end_date < now) {
                msg = 'That election has already ended.';
                res.redirect('/vote/?error=' + msg);
              } else {
                return res.render('pages/voting/ballot/index', {election});
              }
            }
          });
        }
      } else {
        res.redirect('/account/login/');
      }
    },
    submitVote(req, res) {
      const {
        ballotJsonString,
        signature,
      } = req.body;

      const ballot = JSON.parse(ballotJsonString);
      const now = new Date();
      if (!req.session || !req.session.voter) {
        return res.status(401).send({message: 'You are not authorised.'});
      }

      if (now > req.session.tokenExpirationDate) {
        req.session.destroy();
        req.session = null;
        return res.status(401).send({message: 'Your session has expired'});
      }
      let ballotDbId = null;

      console.log('start', ballotJsonString, signature);

      data.getOnlineIdentity(req.session.voter.onlineIdentityId)
          .then((onlineIdentity) => {
            console.log('Part 1', onlineIdentity);
            if (!onlineIdentity) {
              throw new Error('Invalid online identity file.');
            }

            return cryptoUtils.verifyECDSA256(
                onlineIdentity.public_key,
                ballotJsonString,
                signature,
                true
            );
          }).then((isSignatureValid) => {
            console.log('Part 2', isSignatureValid);
            if (!isSignatureValid) {
              throw new Error('Invalid online identity file.');
            }


            return Promise.all([
              data.getElectionById(ballot.electionId),
              data.getBallotFromOidForElection(
                  req.session.voter.onlineIdentityId,
                  ballot.electionId
              ),
            ]);
          }).then((result) => {
            console.log('Part 3', result);
            const [election, castBallot] = result;
            if (!election) {
              throw new Error('No such election exists.');
            }
            if (castBallot) {
              throw new Error('You have already voted in this election.');
            }
            if (!(election.start_date <= now
              && election.end_date >= now)) {
              throw new Error('Election is not currently active.');
            }
            // TODO: add region constraint

            ballot.ageGroup = req.session.voter.ageGroup;

            const aesKey = cryptoUtils.randomHexString();

            return Promise.all([
              cryptoUtils.encryptAES(aesKey, JSON.stringify(ballot)),
              cryptoUtils.rsaPKCS1OaepEncrypt(election.master_key, aesKey),
            ]);
          }).then((result) => {
            console.log('Part 4', result);
            const [encryptedBallot, encryptedAesKey] = result;

            return data.createBallot(
                ballot.electionId,
                req.session.voter.onlineIdentityId,
                JSON.stringify(encryptedBallot),
                encryptedAesKey);
          }).then((dbBallot) => {
            console.log('Part 5', dbBallot);
            if (!dbBallot) {
              throw new Error('Ballot was not recorded! Try again.');
            }

            ballotDbId = dbBallot.id;

            return data.markTokenUsedInElection(
                req.session.voter.votingToken,
                dbBallot.election_id
            );
          }).then((votingRecordCreated) => {
            console.log('Part 6', votingRecordCreated);
            // === true assures that the value is boolean
            if (votingRecordCreated === true) {
              res.sendStatus(200);
            } else {
              throw new Error('An error occurred while recording your vote.');
            }
          }).catch((error) => {
            console.log(error);
            if (ballotDbId !== null && typeof ballotDbId == 'number') {
              data.removeBallot(ballotDbId).then(() => {
                res.status(400).send({message: error.message});
              });
            } else {
              return res.status(400).send({message: error.message});
            }
          });
    },
  };
};
