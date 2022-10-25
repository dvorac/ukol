FROM node:alpine

WORKDIR /app

COPY . .

RUN yarn

# will be overriden by docker-compose
CMD ["yarn", "run", "start", "api"]