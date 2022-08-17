import Knex from 'knex'
import config from '../../../knexfile'
import { Model } from 'objection'

export const initDb = async () => {
  const knex = Knex(config['development']);

  try {
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