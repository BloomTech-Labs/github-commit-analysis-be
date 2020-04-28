const cleanProfile = (profile) => ({
  avatarUrl: `${profile._json.avatar_url}`,
  bio: `${profile._json.bio}`,
  githubUrl: `${profile._json.html_url}`,
  id: profile._json.id,
  isHireable: profile._json.hireable || false,
  location: `${profile._json.location}`,
  login: `${profile._json.login}`,
  name: `${profile._json.name}`,
  websiteUrl: `${profile._json.blog}`,
});

const cleanRepository = (id, repository) => ({
  description: repository.description,
  homepageUrl: repository.homepageUrl,
  id: repository.id,
  name: repository.name,
  nameWithOwner: repository.nameWithOwner,
  forkCount: repository.forkCount,
  watchCount: repository.watchers.totalCount,
  starCount: repository.stargazers.totalCount,
  userId: id,
});

const findOrCreateUser = async (rawProfile, store) => {
  let profile = cleanProfile(rawProfile);
  try {
    let user = await store.user.findByPk(profile.id);
    if (!user) {
      let success = await store.user.create({ ...profile });
      if (success) {
        user = await store.user.findByPk(profile.id);
        return user;
      } else console.error(`unable to create user`);
    } else return user;
  } catch (error) {
    console.error(error);
  }
};

const updateOrCreateRepositories = (id, repositories, store) => {
  repositories.forEach(async (repository) => {
    let repo = await store.repository.findByPk(repository.id);
    if (!repo) {
      try {
        await store.repository.create(cleanRepository(id, repository));
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await store.repository.update(cleanRepository(id, repository), {
          where: { id: repository.id },
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
};

const fetchRepository = async (repositoryId, store) => {
  try {
    let repo = await store.repository.findByPk({ where: { id: repositoryID } });
    return repo;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const fetchRepositories = async (userID, store) => {
  try {
    let data = await store.repository.findAll({
      where: { userId: userID },
    });
    let repos = data.map((item) => item.dataValues);
    return repos;
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = {
  findOrCreateUser,
  updateOrCreateRepositories,
  fetchRepository,
  fetchRepositories,
};
