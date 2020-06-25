require('dotenv').config();

const { createStore } = require('./datasources');
const { createExpressApp } = require('./api');

// sequelize was initiated in /models/index.js
const { sequelize, models: store } = createStore();

sequelize
// this connects the database
  .authenticate()
  .then(() => {
    console.log(`\n✅ Connection with database successfully established.`);
    sequelize
      .sync({ force: true })
      .then(() => console.log(`✅ Database successfully synchronized.`))
      .then(() => {
        const app = createExpressApp(store);
        app.set('view engine', 'ejs');
        app.listen(process.env.PORT, () => {
          console.log(
            `🚀 Server now listening at:`,
            `http://localhost:${process.env.PORT}\n`,
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
