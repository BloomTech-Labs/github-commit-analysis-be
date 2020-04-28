const router = require('express').Router();

const { authenticateToken } = require('../middleware');
const { fetchRepositories } = require('../datasources/actions');

router.get('/', authenticateToken, async (req, res) => {
  try {
    let repositories = await fetchRepositories(req.id, req.store);
    if (repositories)
      res.status(200).json({
        success: true,
        message: `repositories retrieved`,
        repositories,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
