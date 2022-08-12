import { typedefs } from "@elevatorian/graphql";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import * as http from 'http';
import resolvers from "./resolvers";

/**
 * Returns a configured instance of an Apollo Graphql Server,
 * intended to be attached to an existing express server instance.
 *
 * See Also:
 * - https://www.apollographql.com/docs/apollo-server/integrations/middleware
 *
 * @param httpServer the root http server for the express app.
 * @returns a new {ApolloServer} instance.
 */
const apolloServer = (httpServer: http.Server) => new ApolloServer({
  typeDefs: typedefs,
  resolvers: resolvers,
  plugins: [
    // Our httpServer handles incoming requests to our Express app.
    // Below, we tell Apollo Server to "drain" this httpServer,
    // enabling our servers to shut down gracefully.
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ]
});

export default apolloServer;