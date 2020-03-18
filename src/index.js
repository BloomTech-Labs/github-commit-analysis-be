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

/** TODO:
 *
 * Finish passport handshake and send cookie to frontend.
 * Finish Datasource action libraries.
 * Finish Resolvers.
 * Add Auth check to GraphAPI queries.
 * MOVE THE INFORMATION BELOW TO THE README AND DELETE ASAP!!!
 *
 * ENV VARIABLES BEING USED IN PROJECT ARE AS FOLLOWS:
 * DATABASE_URL
 * GITHUB_CALLBACK_URL
 * GITHUB_CLIENT_ID
 * GITHUB_CLIENT_SECRET
 * GITSTATS_URL
 * PORT
 * SESSION_SECRET
 */
