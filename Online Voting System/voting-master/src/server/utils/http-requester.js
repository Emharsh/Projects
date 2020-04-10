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

/**
 *
 *
 * @param {*} url
 * @param {*} options
 * @return {Promise<Object>}
 */
function getJson(url, options) {
  if (!options || !(options instanceof Object)) {
    options = {};
  }

  options.method = 'GET';
  options.uri = url;
  options.json = true;

  return http(options);
}

module.exports = {
  postJson,
  getJson,
};
