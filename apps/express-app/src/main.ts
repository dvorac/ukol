/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { startApolloServer } from './app/graphql';
import { initDb } from './app/db/init';
import { environment } from './environments/environment';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as http from 'http';

/**
 * App entry point for express/apollo server.
 *
 * See also:
 * - https://www.apollographql.com/docs/apollo-server/integrations/middleware
 */
const main = async () => {
  // init express
  const app = express();

  // enable all cors requests, including preflights
  app.use(cors());

  const httpServer = http.createServer(app);

  // request and response logging
  app.use(morgan('combined'));

  // init apollo middleware, and inject into express
  await startApolloServer(app, httpServer, environment);

  // init db client (knex, postgres)
  await initDb(environment);

  // inject non-graphql endpoints
  app.get('/api', (_, res) => {
    console.log(`api called!`)
    res.send({ message: 'Welcome to express-app!' });
  });

  // start express server
  const port = process.env.port || 3333;
  await new Promise<void>(resolve => {
    httpServer.listen(port, resolve);
  });

  console.log(`Listening at http://localhost:${port}`);
};

main();
