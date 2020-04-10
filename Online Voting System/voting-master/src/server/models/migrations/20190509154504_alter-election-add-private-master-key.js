exports.up = function(knex, Promise) {
  return knex.schema.hasTable('elections').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('elections', (table) => {
        table.text('private_master_key');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .alterTable('elections', (table) => {
        table.dropColumn('private_master_key');
      });
};


