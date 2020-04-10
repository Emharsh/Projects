/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 * @class Ballot
 * @extends {Objection.Model}
 * @member {int} id
 * @member {Object|String} enc_content
 * @member {String} enc_password
 * @member {Election} election
 * @member {OnlineIdentity} onlineIdentity
 * @member {int} election_id
 * @member {int} onlineidentity_id
 */
class Ballot extends Model {
  static get tableName() {
    return 'ballots';
  }

  static get relationMappings() {
    const OnlineIdentity = require('../voter/online-identity-model');
    const Election = require('./election-model');

    return {
      election: {
        relation: Model.BelongsToOneRelation,
        modelClass: Election,
        join: {
          from: `${Ballot.tableName}.election_id`,
          to: `${Election.tableName}.id`,
        },
      },
      onlineIdentity: {
        relation: Model.BelongsToOneRelation,
        modelClass: OnlineIdentity,
        join: {
          from: `${Ballot.tableName}.onlineidentity_id`,
          to: `${OnlineIdentity.tableName}.id`,
        },
      },
    };
  }
}

module.exports = Ballot;
