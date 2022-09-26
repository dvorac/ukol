#!/bin/ash

yarn knex migrate:latest --knexfile=./apps/express-app/db/knexfile.js
yarn knex seed:run --knexfile=./apps/express-app/db/knexfile.js