const config = require('./knexfile')[process.env.NODE_ENV || 'development'];
const EXIT_ERROR = 1;
const EXIT_SUCCESS = 0;

if (config === undefined) {
  console.error(
      `Knex config not specified for environment ${process.env.NODE_ENV}`
  );
  process.exit(EXIT_ERROR);
}

const dbName = config.connection.database;
config.connection.database = null;
const knex = require('knex')(config);

knex.raw(`CREATE DATABASE ${dbName}`)
    .then(() => knex.destroy(() => process.exit(EXIT_SUCCESS)))
    .catch((error) => {
      let exitCode = EXIT_SUCCESS;
      if (error.code !== 'ER_DB_CREATE_EXISTS') {
        console.error(error.toString());
        exitCode = EXIT_ERROR;
      }
      knex.destroy(() => process.exit(exitCode));
    });
