FROM node:alpine AS build

WORKDIR /build

ENV NODE_ENV development

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn nx reset
RUN yarn nx run web:build:production

FROM node:alpine AS runtime

WORKDIR /app

COPY --from=build /build/dist/apps/web ./web
COPY --from=build /build/apps/web/server .

RUN yarn install

EXPOSE 8080

CMD ["node", "server.js"]
