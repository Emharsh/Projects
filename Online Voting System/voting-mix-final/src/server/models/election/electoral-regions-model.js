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
    };
  }
}

module.exports = ElectoralRegions;
