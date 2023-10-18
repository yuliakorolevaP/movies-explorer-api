const { NODE_ENV, JWT_SECRET, DB_URL } = process.env;
// Секретный ключ для разработки и отладки приложения:
const JWT_SECRET_DEV = 'dev-secret-key';

const messageError = {
  BadRequest: 'Переданы некорректные данные',
  Conflict: 'Пользователь с таким email уже существует',
  Forbidden: 'Доступ запрещен',
  InternalServerError: 'На сервере произошла ошибка',
  NotFound: 'Страница не найдена',
  NotFoundMovie: 'ильм с указанным _id не найден',
  Unauthorized: 'Необходима авторизация',
};

const statusCode = {
  BadRequest: 400,
  Conflict: 409,
  Forbidden: 403,
  InternalServerError: 500,
  NotFound: 404,
  Unauthorized: 401,
};

module.exports = {
  statusCode,
  messageError,
  NODE_ENV,
  JWT_SECRET,
  JWT_SECRET_DEV,
  DB_URL,
};
