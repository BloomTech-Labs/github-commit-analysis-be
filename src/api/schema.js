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
    repoList: [RepoSummary]!
    repoCount: Int
    websiteUrl: String
  }
  type RepoSummary {
    createdAt: String
    description: String
    homepageUrl: String
    id: ID!
    name: String
    nameWithOwner: String!
  }

  type Query {
    getViewer: User
    getRepoCount: Int
    getRepoList: [RepoSummary]
  }
`;

module.exports = typeDefs;
