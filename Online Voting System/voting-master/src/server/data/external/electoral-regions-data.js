const constants = require('../../config/constants');

/**
 *
 *
 * @export
 * @param {*} options
 * @return {ExternalElectoralRegionsData}
 */
module.exports = function(options) {
  const {
    httpRequester,
  } = options;

  return {
    getElectoralRegionsForPostcode(postcode) {
      return httpRequester.getJson(
          constants.MAP_IT_API.getPostcodeInfoUrl(postcode)
      ).then((response) => {
        const electoralRegionNames = new Set();
        if (response.areas) {
          for (const areaInfo of Object.values(response.areas)) {
            if (areaInfo.name) {
              electoralRegionNames.add(areaInfo.name);
            }
          }
        }
        return [...electoralRegionNames];
      }).catch((_error) => {
        return [];
      });
    },
  };
};
