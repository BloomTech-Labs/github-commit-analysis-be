require('dotenv').config();

const { createStore } = require('./datasources');
const { createExpressApp, createApolloServer } = require('./api');

const { sequelize, models: store } = createStore();

sequelize
  .authenticate()
  .then(() => {
    console.log(`\n✅ Connection with database successfully established.`);
    sequelize
      .sync({ force: true })
      .then(() => console.log(`✅ Database successfully synchronized.`))
      .then(() => {
        const app = createExpressApp(store);
        const server = createApolloServer();

        server.applyMiddleware({ app });
        app.set('view engine', 'ejs');
        app.listen(process.env.PORT, () => {
          console.log(
            `🚀 Server now listening at:`,
            `http://localhost:${process.env.PORT}${server.graphqlPath}\n`,
          );
        });
      })
      .catch((error) =>
        console.error(`🚧 Unable to synchronize database: ${error}`),
      );
  })
  .catch((error) => {
    console.error(`🚧 Unable to connect to the database: ${error}`);
  });
