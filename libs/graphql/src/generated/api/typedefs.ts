import gql from 'graphql-tag';
export const typedefs = gql`
input AddTaskInput {
  description: String!
  priorityUuid: ID
}

scalar Date

type Mutation {
  taskAdd(input: AddTaskInput!): Task
  taskRemove(input: RemoveTaskInput!): Task
  taskUpdate(input: UpdateTaskInput!): Task
  unused: String
}

type Priority {
  description: String!
  priority: Int
  uuid: ID!
}

type Query {
  priorityAll: [Priority!]!
  priorityFind(uuid: ID!): Priority
  taskAll: [Task!]!
  taskFind(uuid: ID!): Task
  unused: String
}

input RemoveTaskInput {
  uuid: ID!
}

type Task {
  description: String!
  priority: Priority
  uuid: ID!
}

input UpdateTaskInput {
  description: String
  priorityUuid: ID
  uuid: String!
}
`