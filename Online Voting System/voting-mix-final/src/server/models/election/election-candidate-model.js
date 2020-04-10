/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 * @class ElectionCandidate
 * @extends {Objection.Model}
 * @member {int} id
 * @member {Election} election
 * @member {Candidate} candidate
 * @member {Party} currentParty
 * @member {int} election_id
 * @member {int} candidate_id
 * @member {int} current_party_id
 */
class ElectionCandidate extends Model {
  static get tableName() {
    return 'election_candidates';
  }

  static get relationMappings() {
    const Party = require('./party-model');
    const Candidate = require('./candidate-model');
    const Election = require('./election-model');

    return {
      election: {
        relation: Model.BelongsToOneRelation,
        modelClass: Election,
        join: {
          from: `${ElectionCandidate.tableName}.election_id`,
          to: `${Election.tableName}.id`,
        },
      },
      candidate: {
        relation: Model.BelongsToOneRelation,
        modelClass: Candidate,
        join: {
          from: `${ElectionCandidate.tableName}.candidate_id`,
          to: `${Candidate.tableName}.id`,
        },
      },
      currentParty: {
        relation: Model.BelongsToOneRelation,
        modelClass: Party,
        join: {
          from: `${ElectionCandidate.tableName}.current_party_id`,
          to: `${Party.tableName}.id`,
        },
      },
    };
  }
}

module.exports = ElectionCandidate;
