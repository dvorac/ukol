import { Priority } from '@ukol/graphql';
import { Priority as PriorityModel } from '@ukol/data';

export const priorityQueries = {
  priorityFind: async (parent, args, context, info): Promise<Priority> => {
    // fetch
    const result = await PriorityModel.query()
      .select('uuid', 'description', 'priority')
      .where('uuid', args.uuid)

    const model = result[0];

    // transpose db model to graphql model
    return {
      uuid: model.uuid,
      description: model.description,
      priority: model.priority,
    };
  },
  priorityAll: async (parent, args, context, info): Promise<Priority[]> => {
    const result = await PriorityModel.query()
      .select('uuid', 'description', 'priority');

    const models = result;

    return models.map(model => ({
      uuid: model.uuid,
      description: model.description,
      priority: model.priority,
    }));
  }
}
