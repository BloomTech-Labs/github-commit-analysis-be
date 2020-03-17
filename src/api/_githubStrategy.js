const GitHubStrategy = require('passport-github').Strategy;
const {
  github: { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL },
} = require('../config/secrets');

module.exports = new GitHubStrategy(
  {
    clientID: `${CLIENT_ID}`,
    clientSecret: `${CLIENT_SECRET}`,
    callbackURL: `${CALLBACK_URL}`,
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log('accessToken: ', accessToken);
    console.log('profile: ', profile._json);
    // TODO: look up or create user in DB
    // TODO: create unique cookie
    // TODO: send cookie to front end
  },
);
