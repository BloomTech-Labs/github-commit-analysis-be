const express = require('express');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const morgan = require('morgan');

const githubStrategy = require('./_githubStrategy');
const sessionSetup = require('./_sessionSetup');
const router = require('../routes');

const server = express();
const publicDir = __dirname.replace('/src/api', '/public');

passport.use(githubStrategy);
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.static(publicDir));
server.use(session(sessionSetup));
server.use('/', router);

module.exports = server;
