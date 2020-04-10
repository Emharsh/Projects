/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 * @class ElectionTypes
 * @extends {Objection.Model}
 * @member {int} id_election_types
 * @member {String} name
 * @member {int} voting_system
 * @member {String} info_url
 */
class ElectionTypes extends Model {
  static get tableName() {
    return 'election_types';
  }

  static get relationMappings() {
    const VotingSystem = require('./voting-systems-model');
    const ElectoralRegions = require('./election-types-model');
    const Election = require('./election-model');

    return {
      votingSystem: {
        relation: Model.BelongsToOneRelation,
        modelClass: VotingSystem,
        join: {
          from: `${ElectionTypes.tableName}.voting_system`,
          to: `${VotingSystem.tableName}.id_voting_system`,
        },
      },
      electoralRegions: {
        relation: Model.HasManyRelation,
        modelClass: ElectoralRegions,
        join: {
          from: `${ElectionTypes.tableName}.id_election_types`,
          to: `${ElectoralRegions.tableName}.id_regions`,
        },
      },
      elections: {
        relation: Model.HasManyRelation,
        modelClass: Election,
        join: {
          from: `${ElectionTypes.tableName}.id_election_types`,
          to: `${Election.tableName}.type`,
        },
      },
    };
  }
}

module.exports = ElectionTypes;
