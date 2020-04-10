
exports.up = function(knex, Promise) {
  return knex.schema.hasTable('electoral_regions').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('electoral_regions', (table) => {
        table.integer('parent_id');
        table.string('council_id');
        table.string('station_id');
        table.integer('mapit_id');
        table.string('country_code');
		table.string('type_name');
		table.string('mapit_type_code');
		table.string('ons_code');
		table.string('gss_code');
		table.string('unit_id_code');
      });
    }
  });};

exports.down = function(knex, Promise) {
  
};