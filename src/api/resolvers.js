module.exports = {
  Query: {
    getUser: async (_, { userID }, { dataSources }) => {
      //do stuff
      // return User
    },
    getRepoCount: async (_, { userID }, { dataSources }) => {
      // return Int
    },
    getRepoList: async (_, { userID }, { dataSources }) => {
      //return [Repository]
    },
  },
};
