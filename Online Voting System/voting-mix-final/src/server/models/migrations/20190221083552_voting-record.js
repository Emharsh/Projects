exports.up = function(knex, Promise) {
  return knex.schema.hasTable('voting_records').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('voting_records', (table) => {
        table.increments('id').primary();
        table.integer('voter_id').unsigned().notNullable()
            .references('voters.id');
        table.integer('election_id').unsigned().notNullable()
            .references('elections.id');
        table.unique(['voter_id', 'election_id']);
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('voting_records');
};

