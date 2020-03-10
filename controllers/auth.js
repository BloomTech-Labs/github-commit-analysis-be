const secrets = require('../config/secrets');

const authController = (module.exports = {});

authController.logout = async (req, res, next) => {
  try {
    // do things with passport
    res.send('logging out');
  } catch (err) {
    next(err);
  }
};

authController.callback = (req, res, next) => {
  res.send('you reached the callback URI');
  // res.redirect(`${secrets.GITSTATS_URL}`); // successful auth, redirect with response.
};
