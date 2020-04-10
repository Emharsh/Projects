// you can run this file with `node example-queries.js`
const {Model} = require('objection');
const knexConfig = require('../config').knex;
const knex = require('knex')(knexConfig);

Model.knex(knex);


const {
  Candidate,
  Party,
  Voter,
  Ballot,
  ElectionCandidate,
  Election,
  OnlineIdentity,
  VotingRecord,
  Sessions,
} = require('./model-loader')();


/* These are simple queries that retrieve relations with depth 1
using the "eager" function. More info about CRUD operations in Objection.js
can be found here -> https://vincit.github.io/objection.js/#table-queries
*/

Promise.all([
  Party.query().eager({candidates: true}),
  Candidate.query().eager({party: true, elections: true}),
  Voter.query().eager({votedElections: true, votingRecords: true}),
  OnlineIdentity.query().eager({ballots: true}),
  VotingRecord.query().eager({voter: true, election: true}),
  Ballot.query().eager({onlineIdentity: true, election: true}),
  Sessions.query().eager({
    voter: true,
  }),
  ElectionCandidate.query().eager({
    currentParty: true,
    election: true,
    candidate: true,
  }),
  Election.query().eager({
    mainElection: true,
    ballots: true,
    electionCandidates: true,
    voters: true,
  }),
]).then((data) => {
  data.forEach((relations) => {
    relations.forEach((r) => {
      console.log(r);
      console.log();
    });

    console.log();
    console.log('-------------------------------');
    console.log();
  });
});
