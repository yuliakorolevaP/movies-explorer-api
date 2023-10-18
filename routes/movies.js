const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validationCreateMovies,
  validationMovie,
} = require('../middlewares/validation');

router.get('/movies', getMovies);

router.post('/movies', validationCreateMovies, createMovie);

router.delete('/movies/:id', validationMovie, deleteMovie);

module.exports = router;
