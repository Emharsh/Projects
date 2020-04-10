/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 * @class Candidate
 * @extends {Objection.Model}
 * @member {int} id
 * @member {String} name
 * @member {String} picture_url
 * @member {binary} picture
 * @member {Party} party
 * @member {Election[]} elections
 * @member {int} party_id
 */
class Candidate extends Model {
  static get tableName() {
    return 'candidates';
  }

  static get virtualAttributes() {
    return ['fields', 'idColumn'];
  }

  static get fields() {
    return {
      id: { header: 'ID', type: 'number', subtype: 'short' },
      name: { header: 'Name', type: 'string', subtype: 'long' },
      party_id: { header: 'Party ID', type: 'string', subtype: 'long' },
      picture: { header: 'Picture', type: 'image', subtype: 'portrate' },
      picture_url: { header: 'Picture URL', type: 'string', subtype: 'long' }
    };
  }

  static get relationMappings() {
    const Party = require('./party-model');
    const Election = require('./election-model');
    const ElectionCandidate = require('./election-candidate-model');

    return {
      party: {
        relation: Model.BelongsToOneRelation,
        modelClass: Party,
        join: {
          from: `${Candidate.tableName}.party_id`,
          to: `${Party.tableName}.id`,
        },
      },
      elections: {
        relation: Model.ManyToManyRelation,
        modelClass: Election,
        join: {
          from: `${Candidate.tableName}.id`,
          through: {
            from: `${ElectionCandidate.tableName}.candidate_id`,
            to: `${ElectionCandidate.tableName}.election_id`,
          },
          to: `${Election.tableName}.id`,
        },
      },
    };
  }
}

module.exports = Candidate;
