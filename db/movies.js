const client = require('./client.js');

const createMovie = async(movieName) => {
  try {
    const { rows } = await client.query(`
        INSERT INTO movies (movie_name)
        VALUES ('${movieName}')
        RETURNING *;
      `)
      const movie = rows[0];
      return movie;
  } catch(error) {
    console.log(error);
  }
}

const getAllMovies = async() => {
  try {
    const { rows } = await client.query(`
        SELECT movie_name FROM movies; 
      `)
      return rows;
  } catch(error) {
    console.log(error);
  }
}

module.exports = { createMovie, getAllMovies };