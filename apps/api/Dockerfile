FROM node:alpine as build

WORKDIR /build

ENV NODE_ENV development

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn nx reset
RUN yarn nx codegen graphql
RUN yarn nx build api

FROM node:alpine as app

ENV NODE_ENV production

ENV PORT 3333
EXPOSE 3333

COPY --from=build /build/dist/apps/api .

RUN yarn install --frozen-lockfile

CMD ["node", "main.js"]
