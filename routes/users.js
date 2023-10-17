// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me

const routerUsers = require('express').Router();

const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

const {
  validationGetUser,
  validationUpdateUser,
} = require('../middlewares/validation');

routerUsers.get('/users/me', validationGetUser, getCurrentUser);

routerUsers.patch('/users/me', validationUpdateUser, updateUser);

module.exports = routerUsers;
