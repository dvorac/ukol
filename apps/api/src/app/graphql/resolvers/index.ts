import { priorityQueries } from './priorities';
import { taskQueries, taskMutations} from './tasks';

const resolvers = {
  Query: {
    ...taskQueries,
    ...priorityQueries,
  },
  Mutation: {
    ...taskMutations,
  }
};

export default resolvers;
