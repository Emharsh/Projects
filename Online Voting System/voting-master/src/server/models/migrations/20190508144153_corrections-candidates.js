exports.up = function(knex, Promise) {
  return knex.schema.hasTable('candidates').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('candidates', (table) => {
        table.specificType('picture', 'BLOB');
      });
    }
  });
};

exports.down = function(knex, Promise) {
	
};