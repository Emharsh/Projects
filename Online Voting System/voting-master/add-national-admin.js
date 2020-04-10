/* eslint-disable require-jsdoc */
const constants = require('./src/server/config/constants');
const config = require('./knexfile')[process.env.NODE_ENV || 'development'];
const {pbkdf2} = require('./src/server/utils/crypto-utils');

const EXIT_ERROR = 1;
const EXIT_SUCCESS = 0;

if (config === undefined) {
  console.error(
      `Knex config not specified for environment ${process.env.NODE_ENV}`
  );
  process.exit(EXIT_ERROR);
}

const knex = require('knex')(config);
const {Model} = require('objection');
Model.knex(knex);
const Admin = require('./src/server/models/admin/admin-model');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput(prompt) {
  prompt = prompt || '';
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{10,30}$/gm;

password = '';
username = '';
getUserInput('Enter a username for the new national admin: ')
    .then((_username) => {
      if (!_username) {
        throw new Error('Username cannot be empty!');
      }

      username = _username;

      return getUserInput('Enter a password for the new national admin: ');
    }).then((_password) => {
      if (!_password) {
        throw new Error('Password cannot be empty!');
      }

      if (!regex.test(_password)) {
        throw new Error(
            'Password must be minimum 10 characters and maximum 30, ' +
            'including one capitol, one lower case, ' +
            'one number and one symbol in:!@#$%^&*_=+-'
        );
      }

      password = _password;

      return pbkdf2(password);
    }).then((result) => {
      const {derivedKey, salt} = result;

      return Admin.query().insertAndFetch({
        username,
        password: derivedKey,
        salt,
        role: constants.ADMIN_ROLES.NATIONAL,
      });
    }).then((admin) => {
      if (!admin) {
        throw new Error('Admin not created. Try again.');
      }

      return pbkdf2(password, admin.salt).then((result) => {
        return result.derivedKey === admin.password;
      });
    }).then((isSame) => {
      if (!isSame) {
        throw new Error(
            'Admin was not initialised correctly. Please try again!'
        );
      }
      console.log('Admin created successfully. Exiting...');
      knex.destroy(() => process.exit(EXIT_SUCCESS));
    }).catch((error) => {
      console.log('Error: ');
      console.error(error.message);
      knex.destroy(() => process.exit(EXIT_ERROR));
    });

