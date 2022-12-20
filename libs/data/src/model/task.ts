import { Model } from 'objection'
import { Priority } from './priority';

export class Task extends Model {
  static tableName = 'tasks';
  static idColumn = 'id';

  id!: number;
  uuid!: string;
  description!: string;
  priority!: Priority;

  static relationMappings = () => ({
    priority: {
      relation: Model.BelongsToOneRelation,
      modelClass: Priority,
      join: {
        from: 'tasks.priorityId',
        to: 'priorities.id',
      },
    },
  })
}