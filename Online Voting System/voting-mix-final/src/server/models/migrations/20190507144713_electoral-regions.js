exports.up = function(knex, Promise) {
  return knex.schema.hasTable('electoral_regions').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('electoral_regions', (table) => {
        table.increments('id_regions').primary();
        table.string('name').notNullable();
        table.integer('type').unsigned().notNullable().references('election_types.id_election_types');
        table.integer('electorate');
        table.string('region').notNullable();
        table.string('nation').notNullable();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('electoral_regions');
};
