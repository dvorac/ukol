import { Task } from '@ukol/graphql';
import { Priority as PriorityModel, Task as TaskModel } from '@ukol/data'
import { v4 as uuid } from 'uuid';

export const taskQueries = {
  taskFind: async (parent, args, context, info): Promise<Task> => {
    const { uuid } = args;

    const model = await TaskModel.query()
      .withGraphFetched('priority')
      .where('uuid', uuid)
      .first();

    return {
      uuid: model.uuid,
      description: model.description,
      priority: model.priority
    };
  },
  taskAll: async (parent, args, context, info): Promise<Task[]> => {
    const models = await TaskModel.query()
      .withGraphFetched('priority');

    return models.map(model => ({
      uuid: model.uuid,
      description: model.description,
      priority: model.priority,
    }));
  },
};

export const taskMutations = {
  taskAdd: async (parent, args, context, info) => {
    const { description, priorityUuid } = args.input;

    const priority = await PriorityModel.query()
      .findOne({ uuid: priorityUuid });

    const task = await TaskModel.query()
      .insert({
        uuid: uuid(),
        description: description
      });

    await task.$relatedQuery('priority').relate(priority);

    console.log(`created task: `, task);
    return task;
  },
  taskRemove: async (parent, args, context, info) => {
    const { uuid } = args.input;

    const task = await TaskModel.query()
      .delete()
      .where('uuid', uuid)
      .returning('*')
      .first();

    console.log(`deleted task: `, task);
    return task;
  },
  taskUpdate: async (parent, args, context, info) => {
    const { uuid, description, priorityUuid } = args.input;

    const priority = await PriorityModel.query()
      .findOne({ uuid: priorityUuid });

    const query = TaskModel.query().where('uuid', uuid);
    if (description) {
      query.patch({
        description
      })
    }
    const task = await query.returning('*').first();

    await task.$relatedQuery('priority').relate(priority);

    return task;
  },
}
