const client = require('./client.js');

const createReview = async(movieId, userId, movieReview, movieRating) => {
  try {
    const { rows } = await client.query(`
        INSERT INTO reviews_and_ratings (movie_id, user_id, review, rating)
        VALUES (${movieId}, ${userId}, '${movieReview}', ${movieRating})
        RETURNING *;
      `)
      const review = rows[0];
      return review;
  } catch(error) {
    console.log(error);
  }
}

module.exports = { createReview };