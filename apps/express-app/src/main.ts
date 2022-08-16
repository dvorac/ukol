/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as http from 'http';
import apolloServer from './app/graphql';
import { initDb } from './app/db/init';

/**
 * App entry point for express/apollo server.
 *
 * See also:
 * - https://www.apollographql.com/docs/apollo-server/integrations/middleware
 */
const main = async () => {
  const app = express();

  const httpserver = http.createServer(app);

  const apollo = apolloServer(httpserver);
  await apollo.start();
  apollo.applyMiddleware({ app });

  await initDb();

  app.get('/api', (_, res) => {
    console.log(`api called!`)
    res.send({ message: 'Welcome to express-app!' });
  });

  const port = process.env.port || 3333;

  await new Promise<void>(resolve => {
    httpserver.listen(port, resolve);
  });

  console.log(`Listening at http://localhost:${port}`);
};

main();
