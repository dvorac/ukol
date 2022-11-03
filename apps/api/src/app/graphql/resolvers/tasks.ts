import { Task } from '@ukol/graphql';
import { Context } from '../context';
import { v4 as uuid } from 'uuid';

export const taskQueries = {
  taskFind: async (parent, args, context: Context, info) => {
    // fetch
    const model = await context.prisma.task.findFirst({
      where: { uuid: args.uuid }
    });

    // transpose db model to graphql model
    const gql: Task = {
      uuid: model.uuid,
      description: model.description,
    };

    return gql;
  },
  taskAll: async (parent, args, context: Context, info) => {
    const models = await context.prisma.task.findMany({
      // future search params may go here
    });

    return models.map(m => ({
      uuid: m.uuid,
      description: m.description
    }) as Task);
  }
};

export const taskMutations = {
  taskAdd: async (parent, args, context: Context, info) => {
    const task = await context.prisma.task.create({
      data: {
        uuid: uuid(),
        description: args.input.description
      }
    });

    console.log(`created task: `, task);
    return task;
  },
  taskRemove: async (parent, args, context: Context, info) => {
    const task = await context.prisma.task.delete({
      where: { uuid: args.input.uuid }
    });

    console.log(`deleted task: `, task);
    return task;
  }
}
