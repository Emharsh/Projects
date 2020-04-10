exports.up = function(knex, Promise) {
  return knex.schema.hasTable('voters').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('voters', (table) => {
        table.json('enc_onlineidentity_id').alter();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .alterTable('voters', (table) => {
        table.specificType('enc_onlineidentity_id', 'BLOB')
            .notNullable().alter();
      });
};
