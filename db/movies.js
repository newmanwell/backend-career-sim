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
        SELECT * FROM movies; 
      `)
      return rows[0];
  } catch(error) {
    console.log(error);
  }
}

const getOneMovie = async(movieId) => {
  try {
    const { rows } = await client.query(`
        SELECT * FROM movies WHERE id = ${movieId}
      `)
      return rows[0];
  } catch(error) {
    console.log(error);
  }
}

module.exports = { createMovie, getAllMovies, getOneMovie };