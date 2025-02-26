const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

const client = require('./db/client.js');
client.connect();

const { createUser, loginUser } = require('./db/users.js');
const { getAllMovies, getOneMovie } = require('./db/movies.js');
const { getOneMovieReview } = require('./db/reviews.js');

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
})


app.listen(port, () => console.log(`Listening on port: ${port}`));