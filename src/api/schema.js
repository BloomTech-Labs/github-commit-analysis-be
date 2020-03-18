const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    avatarUrl: String
    bio: String
    githubUrl: String
    id: ID!
    isHireable: Boolean
    location: String
    login: String!
    name: String
    websiteUrl: String
  }
  type Repository {
    description: String
    homepageUrl: String
    id: ID!
    name: String
    nameWithOwner: String!
    data: String!
  }

  type Query {
    getUser(userID: ID!): User
    getRepoCount(userID: ID!): Int
    getRepoList(userID: ID!): [Repository]
  }
`;

module.exports = typeDefs;
