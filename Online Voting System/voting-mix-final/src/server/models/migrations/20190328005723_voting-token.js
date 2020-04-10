exports.up = function(knex, Promise) {
  return knex.schema.hasTable('voting_tokens').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('voting_tokens', (table) => {
        table.increments('id').primary();
        table.integer('voter_id').unsigned().notNullable()
            .references('voters.id');
        table.string('value').notNullable();
        table.date('expiry_date').notNullable();
        table.json('options');
        table.unique('voter_id');
        table.unique('value');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('voting_tokens');
};

