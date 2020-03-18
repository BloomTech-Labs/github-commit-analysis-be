const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }
}

module.exports = UserAPI;
