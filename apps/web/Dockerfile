FROM node:alpine AS build

WORKDIR /build

# defaults to building the minified, non-debug version of the webapp.
# Set a build arg of "development" to build a debugger-enabled app/image,
# including sourcemaps, etc.
ARG BUILD_ENV=production
# defaults app port in container. additional ports for debugging should
# be exposed only thru local docker-compose scripts.
ARG PORT=8080
# defaults to running the package.json "non-debug" server start script.
# use "debug" to select server start script to enable debugging.
ARG RUN_COMMAND="start"

ENV NODE_ENV development

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn nx reset
RUN yarn nx run web:build:${BUILD_ENV}

FROM node:alpine AS runtime

WORKDIR /app

COPY --from=build /build/dist/apps/web ./web
COPY --from=build /build/apps/web/server .

RUN yarn install

EXPOSE ${PORT}

RUN echo #RUN_COMMAND
CMD ["yarn", "run", ${RUN_COMMAND}]
