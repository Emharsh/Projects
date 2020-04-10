exports.up = function(knex, Promise) {
  return knex.schema.hasTable('elections').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('elections', (table) => {
        table.integer('electoral_regions_id').unsigned().notNullable().references('electoral_regions.id_regions');
		table.integer('type').unsigned().notNullable().references('election_types.id_election_types').alter();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  
};
