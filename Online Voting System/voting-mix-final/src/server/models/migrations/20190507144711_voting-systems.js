exports.up = function(knex, Promise) {
  return knex.schema.hasTable('voting_systems').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('voting_systems', (table) => {
        table.increments('id_voting_system').primary();
        table.string('name').notNullable();
        table.string('algorithm').notNullable();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('voting_systems');
};
