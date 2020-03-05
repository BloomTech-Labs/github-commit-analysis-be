const router = require('express').Router();
const authRouter = require('./auth');

router.get('/', (req, res) => {
  res.render('home');
});

router.use('/auth', authRouter);

module.exports = router;
