/**
 * This 'requires' exists to ensure that the following dependencies is included
 * in the build output 'package.json' file. This output package.json is produced
 * via the NX build option "generatePackageJson".
 *
 * See also https://nx.dev/packages/node/executors/webpack#generatepackagejson
 *
 * This approach ensures we maintain version parity in each dependency between
 * the output package.json, and the project-root package.json, _without_ the need
 * to maintain it by hand.
 *
 * An alternative would be to manually 'yarn install <package>' in the docker
 * container, but we'd have to then update root package.json version AND
 * docker-installed version manually.
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