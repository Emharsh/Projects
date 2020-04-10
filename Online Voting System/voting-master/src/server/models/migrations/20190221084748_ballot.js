exports.up = function(knex, Promise) {
  return knex.schema.hasTable('ballots').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('ballots', (table) => {
        table.increments('id').primary();
        table.specificType('enc_content', 'BLOB').notNullable();
        table.specificType('enc_password', 'BLOB').notNullable();
        table.integer('election_id').unsigned().notNullable()
            .references('elections.id');
        table.integer('onlineidentity_id').unsigned().notNullable()
            .references('online_identities.id');
        table.unique(['election_id', 'onlineidentity_id']);
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('ballots');
};
