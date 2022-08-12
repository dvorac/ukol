import gql from 'graphql-tag';
export const typedefs = gql`
scalar Date

type Person {
  id: ID!
  name: String!
}

type Query {
  person(id: ID!): Person
}
`