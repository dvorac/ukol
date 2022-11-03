import gql from 'graphql-tag';
export const typedefs = gql`
input AddTaskInput {
  description: String
}

scalar Date

type Mutation {
  taskAdd(input: AddTaskInput!): Task
  taskRemove(input: RemoveTaskInput!): Task
  unused: String
}

type Query {
  taskAll: [Task!]
  taskFind(uuid: ID!): Task
  unused: String
}

input RemoveTaskInput {
  uuid: ID!
}

type Task {
  description: String
  uuid: ID!
}
`