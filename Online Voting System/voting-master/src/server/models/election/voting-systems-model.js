/* esslint-disable require-jsdoc */
const { Model } = require('objection');

/**
 * @class VotingSystems
 * @extends {Objection.Model}
 * @member {int} id_constituency
 * @member {String} name
 * @member {binary} picture
 * @member {int} type
 */
class VotingSystems extends Model {
  static get tableName(){
    return 'voting_systems';
  }

  static get relationMappings() {
    const ElectionTypes = require('./election-types-model');

    return {
      electionTypes: {
        relation: Model.HasManyRelation,
        modelClass: ElectionTypes,
        join: {
          from: `${VotingSystem.tableName}.id_voting_system`,
          to: `${ElectionTypes.tableName}.voting_system`,
        },
      },
    };
  }
}

module.exports = VotingSystems;
