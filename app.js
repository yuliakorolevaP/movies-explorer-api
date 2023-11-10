require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const limiter = require('./middlewares/limiter');
const { NODE_ENV, DB_URL } = require('./utils/constants');

const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb');
const app = express();
app.use(cors({ origin: ['http://yulia.students.nomoredomainsrocks.ru', 'https://yulia.students.nomoredomainsrocks.ru', 'https://localhost:3000', 'https://localhost:3001', 'http://localhost:3001', 'http://localhost:3000'] }));
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
