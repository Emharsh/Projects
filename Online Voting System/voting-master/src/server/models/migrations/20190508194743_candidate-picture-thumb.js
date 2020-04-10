exports.up = function(knex, Promise) {
  return knex.schema.hasTable('candidates').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('candidates', (table) => {
        table.specificType('picture', 'LONGBLOB').alter();
        table.specificType('picture_small', 'BLOB');
        table.specificType('picture_thumb', 'BLOB');
      });
    }
  });
};

exports.down = function(knex, Promise) {

};
