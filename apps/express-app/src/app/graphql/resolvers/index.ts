import personQueries from "./person";

const resolvers = {
  Query: {
    ...personQueries
  },
  Mutation: {
    //...
  }
};

export default resolvers;