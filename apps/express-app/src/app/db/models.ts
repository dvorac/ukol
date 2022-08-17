import { Model } from 'objection'

export class Person extends Model {
  uuid!: string
  name!: string

  static tableName = 'person'
}