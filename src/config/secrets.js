require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  GITSTATS_URL: process.env.GITSTATS_URL,
  github: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  },
  herokuPG: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
