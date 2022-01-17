const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const { errorHandler } = require('./middlewares');
const { router } = require('./routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(errorHandler);
app.use('/', router);

module.exports = app;
