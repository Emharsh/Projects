exports.up = function(knex, Promise) {
  return knex.schema.hasTable('elections').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('elections', (table) => {
        table.string('postcodes', 2047).alter();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .alterTable('elections', (table) => {
        table.string('postcodes', 255).alter();
      });
};
