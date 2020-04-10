/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 *
 *
 * @class VotingRegion
 * @extends {Objection.Model}
 * @member {int} id
 * @member {String} nino
 * @member {Date} dob
 * @member {JSON} enc_onlineidentity_id
 * @member {String} postcode
 * @member {VotingRecord[]} votingRecords
 * @member {Election[]} votedElections
 */
class VoterRegion extends Model {
  static get tableName() {
    return 'voter_region';
  }

  static get relationMappings() {
    const Voter = require('./voter-model');
    const ElectoralRegions = require('../election/electoral-regions-model');

    return {
      voter: {
        relation: Model.BelongsToOneRelation,
        modelClass: Voter,
        join: {
          from: `${VoterRegion.tableName}.voter_id`,
          to: `${Voter.tableName}.id`,
        },
      },
      electoralRegion: {
        relation: Model.BelongsToOneRelation,
        modelClass: ElectoralRegions,
        join: {
          from: `${VoterRegion.tableName}.electoral_regions_id`,
          to: `${ElectoralRegions.tableName}.id_regions`,
        },
      },
    };
  }
}

module.exports = VoterRegion;
