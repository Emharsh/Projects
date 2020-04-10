exports.up = function(knex, Promise) {
  return knex.schema.hasTable('election_candidates').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('election_candidates', (table) => {
        table.json('results');
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .alterTable('election_candidates', (table) => {
        table.dropColumn('results');
      });
};

