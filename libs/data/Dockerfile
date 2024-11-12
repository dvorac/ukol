FROM node:alpine as build

WORKDIR /build

ENV NODE_ENV development

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn nx reset
RUN yarn nx build data

FROM node:alpine as app

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY --from=build /build/dist/libs/data/ .

RUN yarn install --frozen-lockfile

CMD ["yarn", "knex", "migrate:latest", "--knexfile=./src/db/knexfile.js"]
