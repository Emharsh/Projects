/* eslint-disable require-jsdoc */
const { Model } = require('objection');

/**
 * @class Settings
 * @extends {Objection.Model}
 * @member {int} id_settings
 * @member {string} name
 * @member {JSON} setting
 */
class Settings extends Model {
  static get tableName() {
    return 'settings';
  }

  static get relationMappings() {

    return {
    };
  }
}

module.exports = Settings;