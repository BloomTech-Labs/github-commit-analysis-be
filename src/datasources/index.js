const Sequelize = require('sequelize');

const createStore = () => {
  const sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
    logging: false,
  });

  const models = {
    user: sequelize.import('./models/user'),
    repository: sequelize.import('./models/repository'),
    session: sequelize.import('./models/session'),
  };

  Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) models[key].associate(models);
  });

  return { sequelize, models };
};

module.exports = { createStore };
