import gql from 'graphql-tag';
export const typedefs = gql`
input AddTaskInput {
  description: String
}

scalar Date

type Mutation {
  addTask(input: AddTaskInput!): Task
  removeTask(input: RemoveTaskInput!): Task
}

type Person {
  name: String!
  uuid: ID!
}

type Query {
  allTasks: [Task]
  findTask(uuid: ID!): Task
  person(uuid: ID!): Person
}

input RemoveTaskInput {
  uuid: ID!
}

type Task {
  description: String
  uuid: ID!
}
`