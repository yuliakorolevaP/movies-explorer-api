require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const limiter = require('./middlewares/limiter');

const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
mongoose.connect(DB_URL);
const app = express();

app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(express.json());

app.use('/', routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
