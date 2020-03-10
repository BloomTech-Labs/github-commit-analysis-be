const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const secrets = require('./secrets');

passport.use(
  new GitHubStrategy(
    {
      clientID: `${secrets.github.CLIENT_ID}`,
      clientSecret: `${secrets.github.CLIENT_SECRET}`,
      callbackURL: `${secrets.github.CALLBACK_URL}`,
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile: ', profile);
      console.log('cb: ', cb);
      //TODO: look up or create user in DB
      //TODO: create unique cookie
      //TODO: send cookie to front end
    },
  ),
);
