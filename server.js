const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

const client = require('./db/client.js');
client.connect();

const { createUser } = require('./db/users.js');
const { getAllMovies } = require('./db/movies.js');

// Add a user
app.post('/api/auth/register', async(req, res) => {
  const { name, password } = req.body;

  try {
    const newUser = await createUser(name, password);
    res.send(201);
  } catch(error) {
    next(error);
  }
});

// Show all movies in table
app.get('/api/movies', async(req, res) => {
  try {
    res.send(await getAllMovies());
  } catch {
    next(error);
  }
})


app.listen(port, () => console.log(`Listening on port: ${port}`));