const fileWalker = require('../utils/file-system-utils').walkDirectorySync;

/**
 *
 *
 * @export
 * @param {*} app
 * @param {*} controllers
 * @param {*} options
 */
module.exports = function(app, controllers, options) {
  fileWalker(__dirname, (file) => {
    if (file.includes('-route')) {
      const modulePath = file;
      require(modulePath)(app, controllers, options);
    }
  });
};
