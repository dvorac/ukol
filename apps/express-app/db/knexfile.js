module.exports = {
  client: 'pg',
  connection: 'postgresql://postgres:postgres@db:5432/elevatorian',
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './seeds',
  },
  debug: true,
  acquireConnectionTimeout: 5000,
}