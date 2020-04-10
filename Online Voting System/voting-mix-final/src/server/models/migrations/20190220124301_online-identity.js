exports.up = function(knex, Promise) {
  return knex.schema.hasTable('online_identities').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('online_identities', (table) => {
        table.increments('id').primary();
        table.specificType('public_key', 'VARBINARY(512)').notNullable();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('online_identities');
};
