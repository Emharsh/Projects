/* eslint-disable require-jsdoc */
const {Model} = require('objection');

/**
 * @class Admin
 * @extends {Objection.Model}
 * @member {int} id
 * @member {String} username
 * @member {String} password
 * @member {String} salt
 * @member {String} region
 * @member {Enum} role
 */
// role is a string, one of those found in src/config/constants.js/ADMIN_ROLES
class Admin extends Model {
  static get tableName() {
    return 'admins';
  }
}

module.exports = Admin;
