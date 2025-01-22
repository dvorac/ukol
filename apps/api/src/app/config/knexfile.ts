import { Knex } from 'knex';
import { environment } from '../../environments/environment';

/**
 * This 'requires' exists to ensure that the postgres dependency is included in the
 * build output 'package.json' file. This output package.json is produced via
 * the NX build option "generatePackageJson".
 *
 * See also https://nx.dev/packages/node/executors/webpack#generatepackagejson
 *
 * This approach ensures we maintain version parity in the "pg" depdendency between
 * the output package.json, and the project-root package.json, _without_ the need
 * to maintain it by hand.
 *
 * An alternative would be to manually 'yarn install pg' in the docker container,
 * but we'd have to then update root package.json version AND docker-installed
 * version manually.
 */
require('pg');

const config: Knex.Config = {
  client: 'pg',
  connection: environment.db,
};

export default config;