FROM node:alpine as build

WORKDIR /build

ENV NODE_ENV development

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn nx reset
RUN yarn nx build web

FROM nginx:alpine

WORKDIR /usr/share/nginx/html


COPY --from=build /build/apps/web/nginx.conf /etc/nginx/conf.d/default.conf
RUN cat /etc/nginx/conf.d/default.conf
COPY --from=build /build/dist/apps/web .

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
