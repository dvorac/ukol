import { taskQueries, taskMutations} from './tasks';

const resolvers = {
  Query: {
    ...taskQueries,
  },
  Mutation: {
    ...taskMutations,
  }
};

export default resolvers;
