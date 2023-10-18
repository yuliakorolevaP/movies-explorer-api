const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET, JWT_SECRET_DEV } = require('../utils/constants');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');
const Unauthorized = require('../errors/Unauthorized');
const { messageError } = require('../utils/constants');

const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })).then((user) => res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(messageError.BadRequest));
      }
      if (err.code === 11000) {
        return next(new Conflict(messageError.Conflict));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name: req.body.name },

  ).then((user) => {
    if (!user) {
      throw new NotFound(messageError.NotFound);
    }
    res.send(user);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequest(messageError.BadRequest));
    }
    return next(err);
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(messageError.Unauthorized);
      }
      bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new Unauthorized(messageError.Unauthorized);
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });
          res.send({ token });
        }).catch(next);
    })
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId).then((user) => {
    if (!user) {
      throw new NotFound(messageError.NotFound);
    }
    return res.status(200).send({
      name: user.name,
      email: user.email,
    });
  }).catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequest(messageError.BadRequest));
    }
    return next(err);
  });
};
