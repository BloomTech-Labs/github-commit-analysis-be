const express = require('express');
const passport = require('passport');
const githubStrategy = require('passport-github');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const { ApolloServer } = require('apollo-server-express');

const router = require('../routes');
const typeDefs = require('./schema');
// const resolvers = require('./resolvers');
// const UserAPI = require('../datasources/user');

const publicDir = __dirname.replace('/src/api', '/public');
const corsOptions = { origin: `${process.env.GITSTATS_URL}` };

module.exports.createExpressApp = (store) => {
  const app = express();

  const propagateStore = (req, res, next) => {
    req.store = store;
    next();
  };

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sessionSettings.cookie.secure = true;
  }

  passport.use(
    new githubStrategy(
      {
        clientID: `${process.env.GITHUB_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
        callbackURL: `${process.env.GITHUB_CALLBACK_URL}`,
      },
      async (accessToken, refreshToken, profile, done) => {
        //this is BAD error handling. get some better stuff in place FOR EACH PIECE BELOW ASAP!
        try {
          let profileInfo = {
            avatarUrl: `${profile._json.avatar_url}`,
            bio: `${profile._json.bio}`,
            githubUrl: `${profile._json.html_url}`,
            id: profile._json.id,
            isHireable: profile._json.hireable || false,
            location: `${profile._json.location}`,
            login: `${profile._json.login}`,
            name: `${profile._json.name}`,
            websiteUrl: `${profile._json.blog}`,
          };

          let sid = uuid();
          let storeUser = await store.user.findByPk(profileInfo.id);
          // currently just using if stored. will need to diff later and update as needed.
          if (storeUser) {
            (storeUser) => storeUser.dataValues;
            let jwt = createToken(storeUser.id);
            store.session
              .create({
                sid,
                jwt,
                accessToken,
              })
              .then(done(null, jwt));
          } else {
            let created = await store.user.create({ ...profileInfo });
            if (created) {
              let newUser = await store.user.findByPk(profileInfo.id);
              (newUser) => newUser.dataValues;
              let jwt = createToken(newUser.id);
              store.session
                .create({
                  sid,
                  jwt,
                  accessToken,
                })
                .then(done(null, jwt));
            }
          }
        } catch (error) {
          console.log(error);
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

  app.use('/', propagateStore, router);

  return app;
};

const createToken = (id) =>
  jsonwebtoken.sign({ id }, process.env.SESSION_SECRET, {
    expiresIn: 1000 * 60 * 60,
  });

module.exports.createApolloServer = () => {
  const server = new ApolloServer({
    typeDefs,
    // resolvers,
    // context: async () => { }, // MAYBE USE CONTEXT FOR AUTH CHECKING EACH GRAPH QUERY
    dataSources: () => ({
      // userAPI: new UserAPI({ store }),
    }),
  });

  return server;
};
