const client = require('./client.js');



const createTables = async() => {
  try {
    await client.query(`
          CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(30) NOT NULL UNIQUE,
          password VARCHAR(30) NOT NULL
        );

        CREATE TABLE movies (
          id SERIAL PRIMARY KEY,
          movie_name VARCHAR(30) UNIQUE NOT NULL
        );

        CREATE TABLE reviews_and_ratings (
          id SERIAL PRIMARY KEY,
          movie_id INTEGER REFERENCES movies(id),
          user_id INTEGER REFERENCES users(id),
          review VARCHAR(200) NOT NULL,
          rating INTEGER NOT NULL
        )
      `)
  } catch(error) {
    console.log(error);
  }
} 



const syncAndSeed = async() => {
  try {
    await client.connect();
    console.log('Connected to movie_reviews DB')

    console.log('Creating Tables');
    await createTables();
    console.log('Tables Created');



    await client.end();
    console.log('Disconnected from movie_reviews DB')
  } catch(error) {
    console.log(error);
  }
}

syncAndSeed();