const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

const client = require('./db/client.js');
client.connect();

const { createUser, loginUser, getUserInfo } = require('./db/users.js');
const { getAllMovies, getOneMovie } = require('./db/movies.js');
const { getOneMovieReview, getMyMovieReviews, deleteMyReview, addLoggedInReview } = require('./db/reviews.js');

// Not loged in routes

// Add a user
app.post('/api/auth/register', async(req, res, next) => {
  const { name, password } = req.body;

  try {
    const newUser = await createUser(name, password);
    res.send(201);
  } catch(error) {
    next(error);
  }
});

// Show all movies in table
app.get('/api/movies', async(req, res, next) => {
  try {
    res.send(await getAllMovies());
  } catch {
    next(error);
  }
})

// Show one movie in table
app.get('/api/movies/:id', async(req, res, next) => {
  const { id } = req.params;

  try {
    res.send(await getOneMovie(id));
  } catch(error) {
    next(error);
  }
});

// Show one movie review/rating
app.get('/api/movies/:id/reviews', async(req, res, next) => {
  const { id } = req.params;

  try {
    res.send(await getOneMovieReview(id));
  } catch(error) {
    next(error);
  } 
});

// Login route
app.post('/api/auth/login', async(req, res, next) => {
  const { name, password } = req.body;

  try {
    const token = await loginUser(name, password);
    res.send({ token: token })
  } catch(error) {
    next(error);
  }
});

// Logged in routes

// See account info
app.get('/api/auth/me', async(req, res, next) => {
  try {
    const userDetails = await getUserInfo(req.headers.authorization);
    res.send(userDetails);
  } catch(error) {
    next(error);
  }
});

// See logged in reviews
app.get('/api/reviews/me', async(req, res, next) => {
  try {
  const moviesReviewed = await getMyMovieReviews(req.headers.authorization);
  res.send(moviesReviewed);
  } catch(error) {
    next(error)
  }
});

// Delete a logged in review
app.delete('/api/reviews/:id', async(req, res, next) => {
  const { id } = req.params 

  try {
    const reviewToDelete = await deleteMyReview(req.headers.authorization, id);
    res.send('movie review deleted');
  } catch(error) {
    next(error);
  }
});

// Add a review when logged in
app.post('/api/movies/:id/reviews', async(req, res, next) => {
  const { id } = req.params;
  const { movieName, movieReview, movieRating } = req.body;


  try {
    const reviewToAdd = await addLoggedInReview(req.headers.authorization, id, movieName, movieReview, movieRating);
    res.send(reviewToAdd);
  } catch(error) {
    next(error)
  }
});

app.listen(port, () => console.log(`Listening on port: ${port}`));