const router = require('express').Router();

const { authenticateToken } = require('../middleware');
const { getRepositoryInfo } = require('../api/queries');
const { fetchRepositories } = require('../datasources/actions');
const { response } = require('express');

// const { repository } = require('../datasources/models/repository');

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

router.get('/:repository_name', authenticateToken, async (req, res) => {
  try {
    let repoName = req.params.repository_name;
    let { dataValues: user } = await req.store.user.findByPk(req.id);
    let { dataValues: session } = await req.store.session.findOne({
      where: { jwt: req.token },
    });
    let repoInfo = await getRepositoryInfo(
      session.accessToken,
      user.login,
      repoName,
    );
    if (repoInfo)
      res.status(200).json({
        success: true,
        message: `repository information retrieved`,
        repoInfo,
      });
    else
      res.status(500).json({
        success: false,
        message: `unable to retrieve information`,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

router.put('/starred', authenticateToken, (req, res) => {
  const update = req.body.update;
  const repoId = req.body.repoId;
  const repository = req.store.repository;

  // let repo = req.store.repository.findByPk({ where: { id: repoId } });

  repository.update(
    {isStarred: update},
    {where: {id: repoId}}
  )
  .then(response => {
    res.status(200).json({message: "success"});
  })
  .catch(err => {
    res.status(500).json({message: "failed", err, repoId, update });
  });
});

module.exports = router;
