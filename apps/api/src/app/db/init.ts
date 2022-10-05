import Knex from 'knex';

import { Model } from 'objection';

export const initDb = async (env: any) => {
  const knex = Knex({
    client: 'pg',
    connection: env.db,
  });

  try {
    console.log(`connecting to db: ${env.db}`);
    await knex.raw(`select now()`);
    console.log(`db connection successful!`);
  } catch (e) {
    console.log(`db connection failed!`);
    throw e;
  }

  // attach objection.js to knex
  Model.knex(knex);

  return knex;
};
