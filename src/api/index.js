const express = require('express');
const passport = require('passport');
const githubStrategy = require('passport-github');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const masterRouter = require('../routes');
const { getRepositories } = require('./queries');
const { createSession } = require('./utilities');
const {
  findOrCreateUser,
  updateOrCreateRepositories,
} = require('../datasources/actions');

const publicDir = __dirname.replace('/src/api', '/public');
const corsOptions = { origin: `${process.env.GITSTATS_URL}` };

module.exports.createExpressApp = (store) => {
  const app = express();

  const propagateStore = (req, res, next) => {
    req.store = store;
    next();
  };

  passport.use(
    new githubStrategy(
      {
        clientID: `${process.env.GITHUB_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
        callbackURL: `${process.env.GITHUB_CALLBACK_URL}`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await findOrCreateUser(profile, store, accessToken);
          let repositories = await getRepositories(
            accessToken,
            user.dataValues.login,
          );

          updateOrCreateRepositories(user.dataValues.id, repositories, store);
          createSession(user.dataValues, store.session, accessToken, done);
        } catch (error) {
          console.error(error);
        }
      },
    ),
  );

  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.static(publicDir));
  app.use(passport.initialize());
  app.use(cors(corsOptions));

  app.use('/', propagateStore, masterRouter);

  return app;
};
