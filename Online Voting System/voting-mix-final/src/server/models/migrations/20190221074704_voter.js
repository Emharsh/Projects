exports.up = function(knex, Promise) {
  return knex.schema.hasTable('voters').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('voters', (table) => {
        table.increments('id').primary();
        table.specificType('nino', 'char(9)').notNullable();
        table.date('dob').notNullable();
        table.specificType('enc_onlineidentity_id', 'BLOB').notNullable();
        table.string('postcode', 9).notNullable();
        table.unique('nino');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('voters');
};

