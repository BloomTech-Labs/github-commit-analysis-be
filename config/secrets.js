require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5050,
  DB_ENV: process.env.DB_ENV || null,
};
