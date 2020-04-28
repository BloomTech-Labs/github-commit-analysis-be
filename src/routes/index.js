const router = require('express').Router();
const authRouter = require('./auth');
const repoRouter = require('./repo');

router.get('/', (req, res) => {
  res.render('home');
});

router.use('/auth', authRouter);
router.use('/repo', repoRouter);

module.exports = router;
