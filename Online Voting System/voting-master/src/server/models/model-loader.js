const fileWalker = require('../utils/file-system-utils').walkDirectorySync;

module.exports = function() {
  const models = {};

  fileWalker(__dirname, (modelFile) => {
    if (modelFile.includes('-model') && !modelFile.includes('migrations')) {
      const model = require(modelFile);
      models[model.name] = model;
    }
  });
  return models;
};
