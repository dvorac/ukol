import { Knex } from 'knex';

/**
 * This ensures that the postgres dependency is included in the built 'package.json'
 * via "generatePackageJson".
 *
 * This approach ensures we maintain version parity in the produced 'package.json'
 * with the root package.json when running the app in docker.
 * If we were to manually 'yarn install pg' in the docker container, we'd have to
 * maintain that parity by hand (update root package.json ver. AND docker-installed ver.)
 */
require('pg');

const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DB_CONNECTION_STRING,
};

export default config;