exports.up = function(knex, Promise) {
  return knex.schema.hasTable('voting_tokens').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('voting_tokens', (table) => {
        table.datetime('expiry_date').notNullable().alter();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .alterTable('voting_tokens', (table) => {
        table.date('expiry_date')
            .notNullable().alter();
      });
};
