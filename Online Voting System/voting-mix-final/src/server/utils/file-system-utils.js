const fs = require('fs');
const join = require('path').join;

/**
 *
 *
 * @param {*} currentDirPath
 * @param {*} callback
 */
function walkDirectorySync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach((name) => {
    const filePath = join(currentDirPath, name);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      return callback(filePath, name);
    } else if (stat.isDirectory()) {
      walkDirectorySync(filePath, callback);
    }
  });
}

module.exports = {
  walkDirectorySync,
};
