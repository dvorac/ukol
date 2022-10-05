import personQueries from './person';

const resolvers = {
  Query: {
    ...personQueries,
  },
};

export default resolvers;
