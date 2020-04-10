/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 *
 *
 * @class VotingToken
 * @extends {Objection.Model}
 * @member {int} id
 * @member {Voter} voter
 * @member {string} value
 * @member {Date} expiry_date
 * @member {JSON} options
 * @member {int} voter_id
 */
class VotingToken extends Model {
  static get tableName() {
    return 'voting_tokens';
  }

  static get relationMappings() {
    const Voter = require('./voter-model');

    return {
      voter: {
        relation: Model.BelongsToOneRelation,
        modelClass: Voter,
        join: {
          from: `${VotingToken.tableName}.voter_id`,
          to: `${Voter.tableName}.id`,
        },
      },
    };
  }
}

module.exports = VotingToken;
