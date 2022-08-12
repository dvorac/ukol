import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer, gql } from 'apollo-server-express';
import * as http from 'http';
import resolvers from "./resolvers";

const apolloServer = (httpServer: http.Server) => new ApolloServer({
  typeDefs: gql`
    scalar Date

    schema {
      query: Query
    }

    type Query {
      person(id: ID!): Person
    }

    type Person {
      id: ID!
      name: String!
    }
  `,
  resolvers: resolvers,
  plugins: [
    // Our httpServer handles incoming requests to our Express app.
    // Below, we tell Apollo Server to "drain" this httpServer,
    // enabling our servers to shut down gracefully.
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ]
});

export default apolloServer;