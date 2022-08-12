import { typedefs } from "@elevatorian/graphql";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import * as http from 'http';
import resolvers from "./resolvers";

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