/**
 *
 *
 * @export
 * @param {*} options
 * @return {SettingsData}
 */
module.exports = function (options) {
  const {
    Settings,
  } = options.models;

  return {
    getAllSettings() {
      return Settings.query();
    },
  };
};
