const Sequelize = require('sequelize');

const {
  herokuPG: { DATABASE_URL },
} = require('../../config/secrets');

module.exports.createStore = () => {
  const sequelize = new Sequelize(`${DATABASE_URL}`);

  const models = {
    user: sequelize.import('./user'),
    repository: sequelize.import('./repository'),
  };
  const { user, repository } = models;
  console.log(`USER: ${user}`);
  console.log(`REPOSITORY: ${repository}`);

  Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) models[key].associate(models);
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log(`✅ Connection with database successfully established.`);
      sequelize
        .sync({ force: true })
        .then(() => {
          console.log(`✅ Database successfully synchronized.`);
        })
        .catch((error) =>
          console.error(`🚧 Unable to synchronize database: ${error}`),
        );
    })
    .catch((error) => {
      console.error(`🚧 Unable to connect to the database: ${error}`);
    });

  return { models };
};
