const { v4 } = require('uuid');

exports.seed = async (knex) => {
  await knex('priorities').del();
  await knex('priorities').insert([
    { id: 1, uuid: v4(), description: 'high', priority: 1 },
    { id: 2, uuid: v4(), description: 'med', priority: 2 },
    { id: 3, uuid: v4(), description: 'low', priority: 3 },
    { id: 4, uuid: v4(), description: 'unknown', priority: -1 },
  ]);

  await knex('tasks').del();
  await knex('tasks').insert([
    { uuid: v4(), description: 'critical task', priorityId: 1, },
    { uuid: v4(), description: 'important task', priorityId: 2, },
    { uuid: v4(), description: 'optional task', priorityId: 3, },
    { uuid: v4(), description: 'possible task', priorityId: 4, },
  ]);
}