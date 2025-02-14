FROM node:alpine AS build

WORKDIR /build

# defaults to building the minified, non-debug version of the webapp.
# Set a build arg of "development" to build a debugger-enabled app/image,
# including sourcemaps, etc.
ARG BUILD_ENV=production
# defaults app port in container. additional ports for debugging should
# be exposed only thru local docker-compose scripts.
ARG PORT=8080

ENV NODE_ENV development

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn nx reset

RUN yarn nx run web:build:${BUILD_ENV}

RUN yarn nx run server:build:${BUILD_ENV}

# =====

FROM node:alpine AS runtime

WORKDIR /app

ENV NODE_ENV production

# tells the express server that hosts the React app where to find the pre-built
# react app files to serve via `express.static`.
ENV REACT_APP_PATH ./web

COPY --from=build /build/dist/apps/web ./web
COPY --from=build /build/dist/apps/server .

RUN yarn install

EXPOSE ${PORT}

CMD ["node", "main.js"]
