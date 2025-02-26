const client = require('./client.js');
const { createUser } = require('./users.js');
const { createMovie } = require('./movies.js');
const { createReview } = require('./reviews.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS reviews_and_ratings;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS movies;
      `)
  } catch(error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
          CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(30) NOT NULL UNIQUE,
          password VARCHAR(60) NOT NULL
        );

        CREATE TABLE movies (
          id SERIAL PRIMARY KEY,
          movie_name VARCHAR(30) UNIQUE NOT NULL
        );

        CREATE TABLE reviews_and_ratings (
          id SERIAL PRIMARY KEY,
          movie_id INTEGER REFERENCES movies(id),
          user_name VARCHAR(30) REFERENCES users(name),
          movie_title VARCHAR(30) NOT NULL REFERENCES movies(movie_name),
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
    console.log('Connected to movie_reviews DB');

    console.log('Dropping Tables');
    dropTables();
    console.log('Tables Dropped');

    console.log('Creating Tables');
    await createTables();
    console.log('Tables Created');

    console.log('Creating Users');
    const userShaun = await createUser('shaun', 'shaun1');
    const userRyan = await createUser('ryan', 'ryan1');
    const userJoe = await createUser('joe', 'joe1');
    const userBrianna = await createUser('brianna', 'brianna1');
    const userMaureen = await createUser('maureen', 'maureen1');
    console.log('Users Created');

    console.log('Creating Movies');
    const movieDumbAndDumber = await createMovie('Dumb and Dumber');
    const movieTopGun = await createMovie('Top Gun');
    const movieTerminator2 = await createMovie('Terminator 2');
    const movieNCFOM = await createMovie('No Country For Old Men');
    const movieOceans13 = await createMovie('Oceans Thirteen');
    console.log('Movies Created');

    console.log("Creating Reviews");
    await createReview(movieDumbAndDumber.id, userShaun.name, movieDumbAndDumber.movie_name, 'A cinematic masterpiece', 5);
    await createReview(movieTopGun.id, userRyan.name, movieTopGun.movie_name, 'You can be my wingman', 4);
    await createReview(movieTerminator2.id, userShaun.name, movieTerminator2.movie_name, 'The very best of Arnold', 4.9);
    await createReview(movieNCFOM.id, userMaureen.name, movieNCFOM.movie_name, 'My boyfriend made me watch this', 3.9);
    await createReview(movieOceans13.id, userJoe.name, movieOceans13.movie_name, 'More Clooney please', 4.8);
    console.log('Reviews Created');

    await client.end();
    console.log('Disconnected from movie_reviews DB');
  } catch(error) {
    console.log(error);
  }
}

syncAndSeed();