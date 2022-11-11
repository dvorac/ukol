import { Priority } from '@ukol/graphql';
import { Context } from '../context';

export const priorityQueries = {
  priorityFind: async (parent, args, context: Context, info) => {
    // fetch
    const model = await context.prisma.priority.findFirst({
      where: { uuid: args.uuid }
    });

    // transpose db model to graphql model
    const gql: Priority = {
      ...model,
    };

    return gql;
  },
  priorityAll: async (parent, args, context: Context, info) => {
    const models = await context.prisma.priority.findMany({
      // future search params may go here
    });

    return models.map(model => ({
      ...model
    }) as Priority);
  }
}
