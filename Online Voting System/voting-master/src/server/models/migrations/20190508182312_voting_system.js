exports.up = function(knex, Promise) {
  return knex.schema.hasTable('voting_systems').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('voting_systems', (table) => {
      	table.string('name_long');
      	table.string('name_short');
      	table.json('ballot_options');
        table.specificType('ballot_script', 'BLOB');
		table.specificType('counting_algorithm', 'BLOB');
		table.specificType('election_algorithm', 'BLOB');
		table.specificType('results_algorithm', 'BLOB');
		table.specificType('statistics_algorithm', 'BLOB');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  
};
