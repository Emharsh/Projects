/**
 *
 *
 * @export
 * @param {*} options
 * @return {ElectionData}
 */
module.exports = function(options) {
  const {
    Admin,
  } = options.models;

  return {
    getAllAdmins() {
      return Admin.query();
    },

    getAdmin(username) {
      return Admin.query().findOne('username', '=', username);
    },

    getAdminById(id) {
      return Admin.query().findById(id);
    },

    createAdmin(username, password, salt, role, region) {
      return Admin.query().insertAndFetch({
        username,
        password,
        salt,
        role,
        region,
      }).catch((error) => {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new Error('Admin with this username already exists!');
        } else {
          throw new Error('An error occurred during admin account creation!');
        }
      });
    },
  };
};
