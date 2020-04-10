
exports.up = function(knex, Promise) {
  return knex.schema.hasTable('election_types').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('election_types', (table) => {
        table.string('election_target_role');
        table.string('election_target_role_short');
        table.string('election_target_role_acronym');
        table.string('election_instructions');
        table.string('election_header1');
        table.string('election_header2');
        table.string('election_header3');
        table.string('election_header4');
      });
    }
  });
};

exports.down = function(knex, Promise) {

};
