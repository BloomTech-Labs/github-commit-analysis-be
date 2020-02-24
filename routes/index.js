const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`
    <h1>Looking for API Information?</h1>
    <p>Please see the <a href='https://github.com/Lambda-School-Labs/github-commit-analysis-be'>README</a> for more information on where to go!</p>
  `);
});

module.exports = router;
