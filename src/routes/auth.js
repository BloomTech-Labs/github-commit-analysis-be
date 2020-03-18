const router = require('express').Router();
const passport = require('passport');

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: `${process.env.GITSTATS_URL}`,
  }),
  (req, res) => {
    res.send('you reached the callback URI');
    // Will be fired if authentication is successful. return to FE!
    // Make sure the return is sent with the appropriate headers
    // res.redirect(`${process.env.GITSTATS_URL}`);
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
