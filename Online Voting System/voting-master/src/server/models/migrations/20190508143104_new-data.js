exports.up = function(knex, Promise) {
  return knex.schema.hasTable('voter_region').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('voter_region', (table) => {
        table.increments('id_voter_region').primary();
        table.integer('electoral_regions_id').unsigned().notNullable().references('electoral_regions.id_regions');
        table.integer('voter_id').unsigned().notNullable().references('voters.id');
        table.date('last_updated').notNullable();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('voter_region');
};
