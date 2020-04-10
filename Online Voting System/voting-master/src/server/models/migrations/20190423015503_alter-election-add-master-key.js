exports.up = function(knex, Promise) {
  return knex.schema.hasTable('elections').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('elections', (table) => {
        table.text('master_key').notNullable();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .alterTable('elections', (table) => {
        table.dropColumn('master_key');
      });
};

