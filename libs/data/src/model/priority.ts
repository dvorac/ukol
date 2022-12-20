import { Model } from 'objection'
import { Task } from './task';

export class Priority extends Model {
  static tableName = 'priorities';
  static idColumn = 'id';

  id!: number;
  uuid!: string;
  description: string | undefined;
  priority!: number;
  tasks?: Task[];

  static relationMappings = () => ({
    tasks: {
      relation: Model.HasManyRelation,
      modelClass: Task,
      join: {
        from: 'priorities.id',
        to: 'tasks.priorityId'
      }
    }
  });
}