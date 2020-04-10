/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 * @class Party
 * @extends {Objection.Model}
 * @member {int} id
 * @member {String} name
 * @member {binary} picture
 * @member {Candidate[]} candidates
 */

class Party extends Model {
  static get tableName() {
    return 'parties';
  }

  fields() {
    return {
      id: { header: 'ID', type: 'number', subtype: 'short' },
      name: { header: 'Name', type: 'string', subtype: 'long' },
      picture: { header: 'Picture', type: 'image', subtype: 'portrate' },
    };
  }
  
  static get relationMappings() {
    const Candidate = require('./candidate-model');

    return {
      candidates: {
        relation: Model.HasManyRelation,
        modelClass: Candidate,
        join: {
          from: `${Party.tableName}.id`,
          to: `${Candidate.tableName}.party_id`,
        },
      },
    };
  }
}

module.exports = Party;
