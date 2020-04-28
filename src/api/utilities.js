const jsonwebtoken = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

const createToken = (id) =>
  jsonwebtoken.sign({ id }, process.env.SESSION_SECRET, {
    expiresIn: 1000 * 60 * 60,
  });

const createSession = (user, session, accessToken, done) => {
  let jwt = createToken(user.id);
  session
    .create({
      sid: uuid(),
      jwt,
      accessToken,
    })
    .then(done(null, jwt));
};

module.exports = {
  createSession,
};
