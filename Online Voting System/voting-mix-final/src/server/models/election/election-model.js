/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 * @class Election
 * @extends {Objection.Model}
 * @member {int} id
 * @member {int} type
 * @member {String} name
 * @member {Date} start_date
 * @member {Date} end_date
 * @member {String} postcodes
 * @member {String} master_key
 * @member {int} electoral_regions_id
 * @member {Election} mainElection
 * @member {Ballot[]} ballots
 * @member {ElectionCandidate[]} electionCandidates
 * @member {Voter[]} voters
 * @member {int} main_election_id
 */
class Election extends Model {
  static get tableName() {
    return 'elections';
  }

  fields() {
    return {
      id: { header: 'ID', type: 'number', subtype: 'short' },
      type: { header: 'Type', type: 'string', subtype: 'short' },
      name: { header: 'Name', type: 'string', subtype: 'long' },
      start_date: { header: 'Start', type: 'date', subtype: 'datetime' },
      end_date: { header: 'End', type: 'date', subtype: 'datetime' },
      postcodes: { header: 'Postcodes', type: 'array', subtype: 'string' },
      main_election_id: { header: 'Main Election', type: 'string', subtype: 'mid' },
      master_key: { header: 'Key', type: 'string', subtype: 'vlong' },
      electoral_regions_id: { header: 'Region', type: 'string', subtype: 'short' },
      election_type: { header: 'Type', type: 'number', subtype: 'short' }, 
    };
  }

  static get relationMappings() {
    const ElectionCandidate = require('./election-candidate-model');
    const Ballot = require('./ballot-model');
    const Voter = require('../voter/voter-model');
    const VotingRecord = require('../voter/voting-record-model');
    const ElectoralRegions = require('./electoral-regions-model');
    const ElectionTypes = require('./election-types-model');

    return {
      mainElection: {
        relation: Model.BelongsToOneRelation,
        modelClass: Election,
        join: {
          from: `${Election.tableName}.main_election_id`,
          to: `${Election.tableName}.id`,
        },
      },
      ballots: {
        relation: Model.HasManyRelation,
        modelClass: Ballot,
        join: {
          from: `${Election.tableName}.id`,
          to: `${Ballot.tableName}.election_id`,
        },
      },
      electionCandidates: {
        relation: Model.HasManyRelation,
        modelClass: ElectionCandidate,
        join: {
          from: `${Election.tableName}.id`,
          to: `${ElectionCandidate.tableName}.election_id`,
        },
      },
      voters: {
        relation: Model.ManyToManyRelation,
        modelClass: Voter,
        join: {
          from: `${Election.tableName}.id`,
          through: {
            from: `${VotingRecord.tableName}.election_id`,
            to: `${VotingRecord.tableName}.voter_id`,
          },
          to: `${Voter.tableName}.id`,
        },
      },
      electoralRegion: {
        relation: Model.BelongsToOneRelation,
        modelClass: ElectoralRegions,
        join: {
          from: `${Election.tableName}.electoral_regions_id`,
          to: `${ElectoralRegions.tableName}.id_regions`,
        },
      },
      electionTypes: {
        relation: Model.BelongsToOneRelation,
        modelClass: ElectionTypes,
        join: {
          from: `${Election.tableName}.type`,
          to: `${ElectionTypes.tableName}.id_election_types`,
        },
      },
    };
  }
}

module.exports = Election;
