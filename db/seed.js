const client = require('./client.js');

const syncAndSeed = async() => {
  try {
    await client.connect();
    console.log('Connected to movie_reviews DB')





    await client.end();
    console.log('Disconnected from movie_reviews DB')
  } catch(error) {
    console.log(error);
  }
}

syncAndSeed();