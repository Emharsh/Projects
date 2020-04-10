const constants = require('../../config/constants');
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    name: 'adminAuth',
    login(req, res) {
      const {
        username,
        password,
      } = req.body;

      data.getAdmin(username).then((admin) => {
        if (!admin) {
          throw new Error('Invalid admin username/password!');
        }

        return Promise.all([
          cryptoUtils.pbkdf2(password, admin.salt).then((result) => {
            return result.derivedKey === admin.password;
          }),
          admin,
        ]);
      }).then((result) => {
        const [hasValidCredentials, admin] = result;

        if (!hasValidCredentials) {
          throw new Error('Invalid admin username/password!');
        }

        req.session.admin = admin;
        res.send('Login successful. You will be redirected shortly.');
      }).catch((error) => {
        res.status(400).send(error.message);
      });
    },
    register(req, res) {
      const {
        username,
        password,
        role,
        region,
      } = req.body;

      if (!req.session || !req.session.admin) {
        return res.status(401).send('You are not authorised!');
      }

      if (!constants.ADMIN_ROLES.getRanksLowerThan(req.session.admin.role)
          .includes(role)) {
        return res.status(401)
            .send(`You are not allowed to add this type of admin!`);
      }

      cryptoUtils.pbkdf2(password).then((result) => {
        const {derivedKey, salt} = result;
        return data.createAdmin(username, derivedKey, salt, role, region);
      }).then((admin) => {
        if (!admin) {
          throw new Error('Admin account was not created. Please try again.');
        }

        res.send('Admin account successfully created');
      }).catch((error) => {
        res.status(400).send(error.message);
      });
    },
  };
};
