import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: String!
    email: String!
    username: String!
    isAdmin: Boolean!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    signup(email: String!, password: String!, username: String!): User
    login(email: String!, password: String!): User
    logout: Boolean
  }
`;