exports.up = function(knex, Promise) {
  return knex.schema.hasTable('admins').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('admins', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password', 512).notNullable();
        table.string('salt').notNullable();
        table.string('region');
        table.enu('role', ['national', 'local',
          'registrar', 'polling_station']).notNullable();
        table.unique('username');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('admins');
};
