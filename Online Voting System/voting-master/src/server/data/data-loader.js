const fileWalker = require('../utils/file-system-utils').walkDirectorySync;
const cryptoUtils = require('../utils/crypto-utils');
const functions = require('../utils/functions');
const blox = require('../utils/blox');
const {Model} = require('objection');
const httpRequester = require('../utils/http-requester');

/**
 *
 *
 * @export
 * @param {*} config
 * @return {DataLayerModule}
 */
module.exports = function(config) {
  const knex = require('knex')(config.knex);
  Model.knex(knex);

  const models = require('../models')();

  const data = {};

  fileWalker(__dirname, (moduleFile) => {
    let dataModule = {};
    if (moduleFile.includes('-data')) {
      dataModule = require(moduleFile)({
        models,
        cryptoUtils,
        httpRequester,
        functions,
        blox,
        config,
      });
    }
    Object.keys(dataModule)
        .forEach((key) => {
          data[key] = dataModule[key];
        });
  });

  return data;
};
