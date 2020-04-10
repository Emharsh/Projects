const constants = require('../../config/constants');
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    blox,
  } = params;

  return {
    goto_management(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'View Admins';
      res.locals.page.id = 'view-admins';
      data.getAllAdmins().then((admins) => {
        console.log(admins);
        return res.render('pages/admin/management/index', { admins });
      });
    },

    goto_view_admin(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'View Admin';
      res.locals.page.id = 'view-admin';
      const redirct = '/admin/management/';
      const adminId = req.params.id;
      const id = parseInt(adminId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getAdminById(id).then((admin) => {
          if (!admin) {
            return res.redirect(redirct);
          } else {
            return res.render('pages/admin/management/admin/view', { admin });
          }
        });
      }
    },

    goto_edit_admin(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Edit Admin';
      res.locals.page.id = 'edit-admin';
      const redirct = '/admin/management/';
      const adminId = req.params.id;
      const id = parseInt(adminId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getAdminById(id).then((admin) => {
          if (!admin) {
            return res.redirect(redirct);
          } else {
            return res.render('pages/admin/management/admin/edit', { admin });
          }
        });
      }
    },

    goto_archive_admin(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Archive Admin';
      res.locals.page.id = 'archive-admin';
      const redirct = '/admin/management/';
      const adminId = req.params.id;
      const id = parseInt(adminId);
      if (isNaN(id)) {
        return res.redirect(redirct);
      } else {
        data.getAdminById(id).then((admin) => {
          if (!admin) {
            return res.redirect(redirct);
          } else {
            return res.render('pages/admin/management/admin/archive', { admin });
          }
        });
      }
    },

    goto_new_admin(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'New Admin';
      res.locals.page.id = 'new-admin';

      if (!req.session.admin) {
        return res.redirect('/admin/account/login/');
      }

      lowerRanks = constants.ADMIN_ROLES.getRanksLowerThan(req.session.admin.role);

      return res.render('pages/admin/management/admin/new', { lowerRanks });
    },

    edit_admin(req, res) {
      res.locals.globals.admin_subdomain = true;
      return res.status(400).send('Not implemented');
    },

    archive_admin(req, res) {
      res.locals.globals.admin_subdomain = true;
      return res.status(400).send('Not implemented');
    },

    new_admin(req, res) {
      res.locals.globals.admin_subdomain = true;
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
        const { derivedKey, salt } = result;
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

    goto_management_create(req, res) {
      res.locals.globals.admin_subdomain = true;
      res.locals.page.title = 'Create Admin';
      res.locals.page.id = 'create-admin';

      if (!req.session.admin) {
        return res.redirect('/admin/account/login/');
      }

      lowerRanks = constants.ADMIN_ROLES.getRanksLowerThan(req.session.admin.role);

      return res.render('pages/admin/management/create', {lowerRanks});
    },

  };
};
