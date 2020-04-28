const axios = require('axios').default;

const getRepoTotal = (login) => `
    query {
      user(login: "${login}") {
        repositories {
          totalCount
        }
      }
    }
  `;

const getRepoList = (login, total) => `
    query {
      repositoryOwner(login: "${login}") {
        repositories(first: ${total}) {
          nodes {
            createdAt
            description
            homepageUrl
            id
            name
            nameWithOwner
            forkCount
            stargazers {
              totalCount
            }
            watchers {
              totalCount
            }
          }
        }
      }
    }
  `;

const queryData = async (accessToken, query) => {
  let { data } = await axios({
    url: `https://api.github.com/graphql`,
    method: `post`,
    headers: { Authorization: `Bearer ${accessToken}` },
    data: {
      query,
    },
  });
  return data;
};

const getRepositories = async (accessToken, login) => {
  try {
    let { data: countData } = await queryData(accessToken, getRepoTotal(login));
    let { data: repoData } = await queryData(
      accessToken,
      getRepoList(login, countData.user.repositories.totalCount),
    );

    return repoData.repositoryOwner.repositories.nodes;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getRepositories };
