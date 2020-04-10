exports.up = function(knex, Promise) {
  return knex.schema.hasTable('parties').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('parties', (table) => {
        table.unique('name');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .alterTable('parties', (table) => {
        table.dropUnique('name');
      });
};
