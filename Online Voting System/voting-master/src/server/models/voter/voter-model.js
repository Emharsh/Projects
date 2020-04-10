/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 *
 *
 * @class Voter
 * @extends {Objection.Model}
 * @member {int} id
 * @member {String} nino
 * @member {Date} dob
 * @member {JSON} enc_onlineidentity_id
 * @member {String} postcode
 * @member {VotingRecord[]} votingRecords
 * @member {Election[]} votedElections
 */
class Voter extends Model {
  static get tableName() {
    return 'voters';
  }

  static get relationMappings() {
    const VotingRecord = require('./voting-record-model');
    const Election = require('../election/election-model');
    const VoterRegion = require('./voter-region-model');
    const ElectoralRegions = require('../election/electoral-regions-model');

    return {
      votingRecords: {
        relation: Model.HasManyRelation,
        modelClass: VotingRecord,
        join: {
          from: `${Voter.tableName}.id`,
          to: `${VotingRecord.tableName}.voter_id`,
        },
      },
      votedElections: {
        relation: Model.ManyToManyRelation,
        modelClass: Election,
        join: {
          from: `${Voter.tableName}.id`,
          through: {
            from: `${VotingRecord.tableName}.voter_id`,
            to: `${VotingRecord.tableName}.election_id`,
          },
          to: `${Election.tableName}.id`,
        },
      },
      voterRegions: {
        relation: Model.ManyToManyRelation,
        modelClass: ElectoralRegions,
        join: {
          from: `${Voter.tableName}.id`,
          through: {
            from: `${VoterRegion.tableName}.voter_id`,
            to: `${VoterRegion.tableName}.electoral_regions_id`,
          },
          to: `${ElectoralRegions.tableName}.id_regions`,
        },
      },
      voterElections: {
        relation: Model.ManyToManyRelation,
        modelClass: Election,
        join: {
          from: `${Voter.tableName}.id`,
          through: {
            from: `${VoterRegion.tableName}.voter_id`,
            to: `${VoterRegion.tableName}.electoral_regions_id`,
          },
          to: `${ElectoralRegions.tableName}.id_regions`,
        },
      },
    };
  }
}

module.exports = Voter;
