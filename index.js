const app = require('./app.js');
const secrets = require('./config/secrets.js');

const PORT = secrets.PORT;

app.set('view engine', 'ejs');
app.listen(PORT, () => {
  console.log(`\n*** Server now listening on port ${PORT}***\n`);
});
