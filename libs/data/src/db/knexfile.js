/**
 * The following imports are not used directly, but exist to ensure that when
 * this library is built, the package.json that is made with "generatePackageJson"
 * Also includes critical dependencies for running data migrations/utilities.
 */
require('knex');
require('pg');

module.exports = {
  client: 'pg',
  connection: process.env.DB_CONNECTION_STRING,
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};