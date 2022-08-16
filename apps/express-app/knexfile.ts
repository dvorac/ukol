// Update with your config settings.
const config = {

  development: {
    client: 'pg',
    connection: 'postgresql://postgres:postgres@localhost:5432/elevatorian',
    migrations: {
      directory: 'db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: 'db/seeds'
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: 'postgres://localhost:5432/elevatorian',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: 'db/seeds'
    },
  }
};

export default config;