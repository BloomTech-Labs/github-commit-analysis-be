import { gql } from 'apollo-server-express';

const GetViewer = gql`
  query GetViewer {
    viewer {
      id
      avatarUrl
      login
      name
      bio
      location
      isHireable
      url
      websiteUrl
    }
    rateLimit(dryRun: true) {
      remaining
      cost
      limit
      nodeCount
      resetAt
    }
  }
`;

const GetRepoCount = gql`
  query GetRepoCount($username: String!) {
    user(login: $username) {
      repositories {
        totalCount
      }
    }
    rateLimit(dryRun: true) {
      remaining
      cost
      limit
      nodeCount
      resetAt
    }
  }
`;

const GetRepoList = gql`
  query GetRepoList($username: String!, $totalCount: Int!) {
    repositoryOwner(login: $username) {
      repositories(first: $totalCount) {
        nodes {
          createdAt
          description
          homepageUrl
          id
          name
          nameWithOwner
        }
      }
    }
    rateLimit(dryRun: true) {
      remaining
      cost
      limit
      nodeCount
      resetAt
    }
  }
`;
