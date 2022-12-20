import { typedefs } from '@ukol/graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import resolvers from './resolvers';

/**
 * Returns a configured instance of an Apollo Graphql Server,
 * intended to be attached to an existing express server instance.
 *
 * See Also:
 * - https://www.apollographql.com/docs/apollo-server/integrations/middleware
 *
 * @returns a new {ApolloServer} instance.
 */
export const startApolloServer = async (app, httpServer, env: any) => {
  const apolloServer = new ApolloServer({
    typeDefs: typedefs,
    resolvers: resolvers,
    csrfPrevention: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
  });
};

export default startApolloServer;
