const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const passportSetup = require('./config/passport-setup');

const apiRouter = require('./routes');

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.static(__dirname + '/public'));

server.use('/', apiRouter);

module.exports = server;
