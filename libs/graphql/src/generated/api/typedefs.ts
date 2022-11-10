import gql from 'graphql-tag';
export const typedefs = gql`
input AddTaskInput {
  description: String!
  priorityId: ID
}

scalar Date

type Mutation {
  taskAdd(input: AddTaskInput!): Task
  taskRemove(input: RemoveTaskInput!): Task
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
`