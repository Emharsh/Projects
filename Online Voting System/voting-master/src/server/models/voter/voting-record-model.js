/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 *
 *
 * @class VotingRecord
 * @extends {Objection.Model}
 * @member {int} id
 * @member {Voter} voter
 * @member {Election} election
 * @member {int} voter_id
 * @member {int} election_id
 */
class VotingRecord extends Model {
  static get tableName() {
    return 'voting_records';
  }

  static get relationMappings() {
    const Voter = require('./voter-model');
    const Election = require('../election/election-model');

    return {
      voter: {
        relation: Model.BelongsToOneRelation,
        modelClass: Voter,
        join: {
          from: `${VotingRecord.tableName}.voter_id`,
          to: `${Voter.tableName}.id`,
        },
      },
      election: {
        relation: Model.BelongsToOneRelation,
        modelClass: Election,
        join: {
          from: `${VotingRecord.tableName}.election_id`,
          to: `${Election.tableName}.id`,
        },
      },
    };
  }
}

module.exports = VotingRecord;
