import { ApolloServer } from 'apollo-server-express';
import schema from './schema';

const apolloServer = new ApolloServer({
   schema: schema,
});

export default apolloServer;