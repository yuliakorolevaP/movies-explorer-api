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
