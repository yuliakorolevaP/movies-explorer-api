const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const { messageError } = require('../utils/constants');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({}).sort({ createdAt: -1 }).then((movies) => { res.send(movies); })
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(messageError.BadRequest));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id).then((movie) => {
    if (!movie) {
      throw new NotFound(messageError.NotFoundMovie);
    } if (!movie.owner.equals(req.user._id)) {
      throw new Forbidden(messageError.Forbidden);
    }
    movie.deleteOne().then(() => res.send({ message: 'Фильм удален' })).catch(next);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest(messageError.BadRequest));
      } return next(err);
    });
};
