#!/bin/ash

yarn knex migrate:latest
yarn knex seed:run