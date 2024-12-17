FROM node:alpine as build

WORKDIR /build

ENV NODE_ENV development

COPY . .

RUN yarn install --frozen-lockfile

RUN echo "api: $API, gql: $GQL"

RUN yarn nx reset
RUN yarn nx run web:build:production

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /build/apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/dist/apps/web .

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
