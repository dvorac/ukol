import { Task } from '@ukol/graphql';
import { Context } from '../context';
import { v4 as uuid } from 'uuid';

export const taskQueries = {
  taskFind: async (parent, args, context: Context, info) => {
    const model = await context.prisma.task.findFirst({
      where: { uuid: args.uuid },
      include: { priority: true },
    });

    const gql: Task = {
      ...model
    };

    return gql;
  },
  taskAll: async (parent, args, context: Context, info) => {
    const models = await context.prisma.task.findMany({
      include: { priority: true },
    });

    return models.map(model => ({
      ...model
    }) as Task);
  },
};

export const taskMutations = {
  taskAdd: async (parent, args, context: Context, info) => {
    const { description, priorityId } = args.input;
    const task = await context.prisma.task.create({
      data: {
        uuid: uuid(),
        description: description,
        priority: {
          connect: {
            uuid: priorityId
          }
        }
      },
      include: {
        priority: true
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
  },
  taskUpdate: async (parent, args, context: Context, info) => {
    const { uuid, description, priorityId } = args.input;
    const task = await context.prisma.task.update({
      where: { uuid: uuid },
      data: {
        description: description,
        priority: {
          connect: {
            uuid: priorityId
          }
        }
      },
      include: {
        priority: true
      }
    });

    console.log(`update task: `, task);
    return task;
  },
}
