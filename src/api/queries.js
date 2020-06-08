const axios = require('axios').default;

const getRepoTotal = (login) => `
    query {
      user(login: "${login}") {
        repositories (affiliations: [OWNER]) {
          totalCount
        }
      }
    }
  `;

const getRepoList = (login, total) => `
    query {
      repositoryOwner(login: "${login}") {
        repositories(first: ${total} affiliations: [OWNER]) {
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

const queryDS = async (requestType, login, repositoryName) => {
  let { data } = await axios({
    url: `${process.env.DS_BASE_URL}/${requestType}/${login}/${repositoryName}`,
    method: `get`,
  });
  return data;
};

const getRepositoryInfo = async (login, repositoryName) => {
  await queryDS(`getPRs`, login, repositoryName)
    .then(async () => {
      return await queryDS('summarize', login, repositoryName);
    })
    .catch((error) => error);
};

module.exports = { getRepositories, getRepositoryInfo };
