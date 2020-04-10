const http = require('request-promise-native');

/**
 *
 *
 * @param {string} url
 * @param {Object} json
 * @param {*} options
 * @return {Promise<Object>}
 */
function postJson(url, json, options) {
  if (!options || !(options instanceof Object)) {
    options = {};
  }

  options.method = 'POST';
  options.uri = url;
  options.json = true;
  options.body = json;

  return http(options);
}

module.exports = {
  postJson,
};
