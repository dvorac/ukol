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
    const { description, priorityId } = args.input;

    const task = await PriorityModel.relatedQuery('tasks')
      .for(priorityId)
      .insert({
        uuid: uuid(),
        description: description,
      });

    console.log(`created task: `, task);
    return task;
  },
  taskRemove: async (parent, args, context, info) => {
    const { uuid } = args.input;

    const task = await TaskModel.query().deleteById(uuid);

    console.log(`deleted task: `, task);
    return task;
  },
  taskUpdate: async (parent, args, context, info) => {
    const { uuid, description, priorityId } = args.input;

    const priority = await PriorityModel.query().findById(priorityId);
    const task = await TaskModel.query()
      .where('uuid', uuid)
      .patch({
        description: description,
      })
      .returning("*")
      .first();
    task.$relatedQuery('priority').relate(priority);

    console.log(`update task: `, task);
    return task;
  },
}
