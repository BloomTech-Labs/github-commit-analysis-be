const router = require('express').Router();
const passport = require('passport');

const { authenticateToken } = require('../middleware');

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    session: false,
    failureRedirect: `${process.env.GITSTATS_URL}`,
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect(`${process.env.GITSTATS_URL}/callback#jwt=${req.user}`);
  },
);

router.get('/verify', authenticateToken, async (req, res) => {
  let storeUser = await req.store.user.findByPk(req.id);
  if (storeUser) {
    let user = storeUser.dataValues;
    res.status(200).json({
      user,
      success: true,
      message: `user retrieved`,
    });
  } else
    res.status(404).json({
      success: false,
      message: `user not found`,
    }); // no user. not found.
});

router.get('/logout', authenticateToken, async (req, res) => {
  try {
    const sessions = await req.store.session.findAll({
      where: { jwt: req.token },
    });
    const deleted = await sessions.map(async (session) => {
      return await req.store.session.destroy({
        where: { sid: session.dataValues.sid },
      });
    });
    if (deleted)
      res.status(200).json({ success: true, message: `session closed` });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: `unable to close session` });
  }
});

module.exports = router;
