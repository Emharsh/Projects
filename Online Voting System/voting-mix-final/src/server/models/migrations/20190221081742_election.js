exports.up = function(knex, Promise) {
  return knex.schema.hasTable('elections').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('elections', (table) => {
        table.increments('id').primary();
        table.integer('type').notNullable();
        table.string('name', 255).notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
        table.string('postcodes', 255);
        table.integer('main_election_id').unsigned().references('elections.id');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('elections');
};
