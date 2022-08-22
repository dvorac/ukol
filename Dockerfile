FROM node:alpine as base
WORKDIR /app
ENV PORT=3333
EXPOSE ${PORT}

FROM base as express
ENV NODE_ENV=production
COPY ./dist/apps/express-app .
RUN yarn
RUN yarn add pg
CMD ["node", "./main.js"]

FROM base as migrations
COPY ./apps/express-app/db .
RUN yarn add pg knex
RUN chmod +x run_migrations.sh
CMD ["sh", "run_migrations.sh"]

FROM nginx:alpine as web
COPY ./apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/apps/web /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]