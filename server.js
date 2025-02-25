const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

const client = require('./db/client.js');
client.connect();

const { createUser } = require('./db/users.js');

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




app.listen(port, () => console.log(`Listening on port: ${port}`));