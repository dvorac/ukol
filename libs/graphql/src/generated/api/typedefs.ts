import gql from 'graphql-tag';
export const typedefs = gql`
scalar Date

type Person {
  name: String!
  uuid: ID!
}

type Query {
  person(uuid: ID!): Person
}
`