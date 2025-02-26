const client = require('./client.js');

const createReview = async(movieId, userName, movieTitle, movieReview, movieRating) => {
  try {
    const { rows } = await client.query(`
        INSERT INTO reviews_and_ratings (movie_id, user_name, movie_title, review, rating)
        VALUES (${movieId}, '${userName}', '${movieTitle}', '${movieReview}', ${movieRating})
        RETURNING *;
      `)
      const review = rows[0];
      return review;
  } catch(error) {
    console.log(error);
  }
}

const getOneMovieReview = async(requestedMovieId) => {
  try {
    const { rows } = await client.query (`
      SELECT * FROM reviews_and_ratings WHERE movie_id = ${requestedMovieId}
      `)
      return rows[0];
  } catch(error) {
    console.log(error);
  }
}

module.exports = { createReview, getOneMovieReview };