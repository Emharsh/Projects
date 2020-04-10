exports.up = function(knex, Promise) {
  return knex.schema.hasTable('candidates').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('candidates', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.integer('party_id').unsigned()
            .references('parties.id');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('candidates');
};
