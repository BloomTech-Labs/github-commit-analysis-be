const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const apiRouter = require('./routes');

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.use('/', apiRouter);

module.exports = server;
