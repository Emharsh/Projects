exports.up = function(knex, Promise) {
  return knex.schema.hasTable('candidates').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('candidates', (table) => {
        table.text('picture_url');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .alterTable('candidates', (table) => {
        table.dropColumn('picture_url');
      });
};
