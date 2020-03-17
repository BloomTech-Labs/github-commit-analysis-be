const router = require('express').Router();
const passport = require('passport');
const { GITSTATS_URL } = require('../config/secrets');

/* AUTH REQUEST
 * Send Authentication request to GitHub.
 *
 */
router.get(
  '/github',
  passport.authenticate('github', {
    failureRedirect: `${GITSTATS_URL}`,
  }),
);

// AUTH CALLBACK
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: `${GITSTATS_URL}`,
  }),
  (req, res, next) => {
    res.send('you reached the callback URI');
    // Will be fired if authentication is successful. return to FE!
    // Make sure the return is sent with the appropriate headers
    // res.redirect(`${GITSTATS_URL}`);
  },
);

router.get('/logout', async (req, res, next) => {
  try {
    // do things with passport
    res.send('logging out');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
