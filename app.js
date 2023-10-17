const express = require('express');
const mongoose = require('mongoose');
// const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
// const cors = require('cors');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validation');
const auth = require('./middlewares/auth');

const errorHandler = require('./middlewares/errorHandler');
const NotFound = require('./errors/NotFound');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
mongoose.connect(DB_URL);
const app = express();
// app.use(cors({ origin: ['http://yuliakorolyova.students.nomoredomainsrocks.ru', 'https://yuliakorolyova.students.nomoredomainsrocks.ru', 'https://api.yuliakorolyova.nomoredomainsrocks.ru', 'http://api.yuliakorolyova.nomoredomainsrocks.ru', 'http://localhost:3001', 'http://localhost:3000'] }));
app.use(requestLogger);
app.use(express.json());

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use('/', routerUsers);
app.use('/', routerMovies);

app.all('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
