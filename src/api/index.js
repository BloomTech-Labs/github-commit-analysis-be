const express = require('express');
const session = require('express-session');
const passport = require('passport');
const githubStrategy = require('passport-github');
const helmet = require('helmet');
const morgan = require('morgan');
const { v4: uuid } = require('uuid');
const { ApolloServer } = require('apollo-server-express');

const router = require('../routes');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const UserAPI = require('../datasources/user');

module.exports.createExpressApp = (store) => {
  const server = express();
  const publicDir = __dirname.replace('/src/api', '/public');

  passport.use(
    new githubStrategy(
      {
        clientID: `${process.env.GITHUB_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
        callbackURL: `${process.env.GITHUB_CALLBACK_URL}`,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('accessToken: ', accessToken);
        console.log('profile: ', profile._json);
        console.log(store);
        // TODO: look up or create user in DB
        // TODO: create unique cookie
        // TODO: send cookie to front end
        // done();
      },
    ),
  );

  server.use(helmet());
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.static(publicDir));
  server.use(
    session({
      genid: (req) => uuid(),
      secret: process.env.SESSION_SECRET,
      cookie: { secure: true },
      resave: false,
      saveUninitialized: false,
    }),
  );

  server.use('/', router);

  return server;
};

module.exports.createApolloServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: async () => { }, // MAYBE USE CONTEXT FOR AUTH CHECKING EACH GRAPH QUERY
    dataSources: () => ({
      userAPI: new UserAPI({ store }),
    }),
  });

  return server;
};
