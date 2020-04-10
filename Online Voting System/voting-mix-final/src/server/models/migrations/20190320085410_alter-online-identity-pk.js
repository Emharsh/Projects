exports.up = function(knex, Promise) {
  return knex.schema.hasTable('online_identities').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('online_identities', (table) => {
        table.text('public_key').notNullable().alter();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .alterTable('online_identities', (table) => {
        table.specificType('public_key', 'VARBINARY(512)')
            .notNullable().alter();
      });
};
