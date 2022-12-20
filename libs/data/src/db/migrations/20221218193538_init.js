exports.up = (knex) => {
  return knex.schema
  .createTable('priorities', (t) => {
    t.increments('id').unsigned().primary();
    t.uuid('uuid').notNullable().unique();
    t.string('description').nullable();
    t.integer('priority').unique();
  })
  .createTable('tasks', (t) => {
    t.increments('id').unsigned().primary();
    t.uuid('uuid').notNullable().unique();
    t.string('description').nullable();
    t.integer('priorityId').references('id').inTable('priorities');
  });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('tasks')
    .dropTable('priorities');
};
