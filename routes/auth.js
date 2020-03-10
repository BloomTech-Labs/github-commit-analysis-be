const router = require('express').Router();
const passport = require('passport');
const auth = require('../controllers/auth');
const secrets = require('../config/secrets');

router.get('/logout', auth.logout);
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['profile', 'user', 'email'],
    failureRedirect: `${secrets.GITSTATS_URL}`, // failed auth, redirect to reattempt.
  }),
);
router.get('/github/callback', passport.authenticate('github'), auth.callback);

module.exports = router;
