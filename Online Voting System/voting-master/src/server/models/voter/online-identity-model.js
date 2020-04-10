/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 *
 *
 * @class OnlineIdentity
 * @extends {Objection.Model}
 * @member {int} id
 * @member {binary} public_key
 * @member {Ballot[]} ballots
 */
class OnlineIdentity extends Model {
  static get tableName() {
    return 'online_identities';
  }

  static get relationMappings() {
    const Ballot = require('../election/ballot-model');

    return {
      ballots: {
        relation: Model.HasManyRelation,
        modelClass: Ballot,
        join: {
          from: `${OnlineIdentity.tableName}.id`,
          to: `${Ballot.tableName}.onlineidentity_id`,
        },
      },
    };
  }
}

module.exports = OnlineIdentity;
