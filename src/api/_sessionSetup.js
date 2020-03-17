const { v4: uuid } = require('uuid');

const secrets = require('../config/secrets');

module.exports = {
  genid: (req) => uuid(),
  secret: secrets.SESSION_SECRET,
  cookie: { secure: true },
  resave: false,
  saveUninitialized: false,
};
