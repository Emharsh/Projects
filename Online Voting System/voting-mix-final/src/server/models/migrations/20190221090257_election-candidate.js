exports.up = function(knex, Promise) {
  return knex.schema.hasTable('election_candidates').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('election_candidates', (table) => {
        table.increments('id').primary();
        table.integer('election_id').unsigned().notNullable()
            .references('elections.id');
        table.integer('candidate_id').unsigned().notNullable()
            .references('candidates.id');
        table.integer('current_party_id').unsigned()
            .references('parties.id');
        table.unique(['election_id', 'candidate_id']);
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('election_candidates');
};
