const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
  } = require('sequelize-test-helpers');

const repoModel = require('../src/datasources/models/repository');
const sessionModel = require('../src/datasources/models/session');
const userModel = require('../src/datasources/models/user');

describe('checks isStarred property in repository model', () => {
    const Model = repoModel(sequelize, dataTypes)
    const instance = new Model()
    checkModelName(Model)('repository')
    describe('repository', () => {
        ;['isStarred'].forEach(checkPropertyExists(instance))
    })
});

describe('checks if column createdAt exists in repository model', () => {
    const Model = repoModel(sequelize, dataTypes)
    const instance = new Model()
    checkModelName(Model)('repository')
    describe('repository', () => {
        ['createdAt'].forEach(checkPropertyExists(instance))
    })
});

describe('checks session model', () => {
    const Model = sessionModel(sequelize, dataTypes)
    const instance = new Model()
    checkModelName(Model)('session')
});

describe('checks user model', () => {
    const Model = userModel(sequelize, dataTypes)
    const instance = new Model()
    checkModelName(Model)('user')
});