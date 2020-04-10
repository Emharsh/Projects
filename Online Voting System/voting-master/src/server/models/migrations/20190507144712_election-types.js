exports.up = function(knex, Promise) {
  return knex.schema.hasTable('election_types').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('election_types', (table) => {
        table.increments('id_election_types').primary();
        table.string('name').notNullable();
        table.integer('voting_system').unsigned().notNullable().references('voting_systems.id_voting_system');
        table.string('info_url');
        table.string('region_name_singular');
        table.string('region_name_multiple');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('election_types');
};
