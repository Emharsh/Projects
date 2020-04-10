const fileWalker = require('../utils/file-system-utils').walkDirectorySync;
const functions = require('../utils/functions');
const blox = require('../utils/blox');
const cryptoUtils = require('../utils/crypto-utils');

/**
 *
 *
 * @export
 * @param {*} params
 * @return {Controllers}
 */
module.exports = function(params) {
  const controllers = {};

  params.cryptoUtils = cryptoUtils;
  params.functions = functions;
  params.blox = blox;

  fileWalker(__dirname, (file, fileName) => {
    if (file.includes('-controller')) {
      const modulePath = file;
      const theModule = require(modulePath)(params);
      const moduleName = theModule.name ||
        fileName.substring(0, fileName.lastIndexOf('-'));

      controllers[moduleName] = theModule;
    }
  });
  return controllers;
};
