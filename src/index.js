const { ApolloServer, gql } = require('apollo-server-express');

const app = require('./api');
const { createStore } = require('./datasources/models');
const typeDefs = require('./api/schema');
// const resolvers = require('./api/resolvers');
// const UserAPI = require('./datasources/user');
// const GithubAPI = require(./datasources/github');

const { PORT } = require('./config/secrets.js');

const { models: store } = createStore();

const server = new ApolloServer({
  typeDefs,
  // resolvers,
  // context: async () => { }, // MAYBE USE CONTEXT FOR AUTH CHECKING EACH GRAPH QUERY
  // dataSources: () => ({
  //   userAPI: new UserAPI({store})
  // })
});

server.applyMiddleware({ app });
app.set('view engine', 'ejs');
app.listen(PORT, () => {
  console.log(
    `\n🚀 Server now listening at http://localhost:${PORT}${server.graphqlPath}\n`,
  );
});

/* TODO:
 *
 * Make server begin listening AFTER PostgresQL database and GraphAPIs are initialized.
 * Create Datasource action libraries.
 * Create Resolvers.
 * Add Auth check to GraphAPI queries.
 *
 */
