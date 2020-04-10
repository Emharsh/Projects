/* esslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 * @class ElectoralRegions
 * @extends {Objection.Model}
 * @member {int} id_constituency
 * @member {String} name
 * @member {binary} picture
 * @member {int} type
 */
class ElectoralRegions extends Model {
  static get tableName() {
    return 'electoral_regions';
  }

  static get relationMappings() {
    const ElectionTypes = require('./election-types-model');
    const Voter = require('../voter/voter-model');
    const VoterRegion = require('../voter/voter-region-model');
    const Election = require('./election-model');

    return {
      electionType: {
        relation: Model.BelongsToOneRelation,
        modelClass: ElectionTypes,
        join: {
          from: `${ElectoralRegions.tableName}.type`,
          to: `${ElectionTypes.tableName}.id_election_types`,
        },
      },
      elections: {
        relation: Model.HasManyRelation,
        modelClass: Election,
        join: {
          from: `${ElectoralRegions.tableName}.id_regions`,
          to: `${Election.tableName}.electoral_regions_id`,
        },
      },
      voters: {
        relation: Model.ManyToManyRelation,
        modelClass: Voter,
        join: {
          from: `${ElectoralRegions.tableName}.id_regions`,
          through: {
            from: `${VoterRegion.tableName}.electoral_regions_id`,
            to: `${VoterRegion.tableName}.voter_id`,
          },
          to: `${Voter.tableName}.id`,
        },
      },
    };
  }
}

module.exports = ElectoralRegions;
