exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('parties').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('parties', (table) => {
          table.increments('id').primary();
          table.string('name', 255);
        });
      }
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('parties');
};
