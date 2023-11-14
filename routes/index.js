const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const {
  validationCreateUser,
  validationLogin,
} = require('../middlewares/validation');
const NotFound = require('../errors/NotFound');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);
router.use(auth);
router.use('/', routerUsers);
router.use('/', routerMovies);

router.all('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
