exports.up = function(knex, Promise) {
  return knex.schema.hasTable('ballots').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('ballots', (table) => {
        table.json('enc_content').notNullable().alter();
        table.text('enc_password').notNullable().alter();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .alterTable('ballots', (table) => {
        table.specificType('enc_content', 'BLOB').notNullable().alter();
        table.specificType('enc_password', 'BLOB').notNullable().alter();
      });
};
