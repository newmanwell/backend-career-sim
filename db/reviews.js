const client = require('./client.js');
const jwt = require('jsonwebtoken');

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

const getMyMovieReviews = async(token) => {
  try {
    require('dotenv').config();
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

    const { rows } = await client.query(`
        SELECT * FROM reviews_and_ratings WHERE user_name='${verifyToken.name}'
      `)
      const reviews = rows;

      if (rows) {
        return rows
      } else {
        return { message: 'Invalid User'};
      }
  } catch(error) {
    console.log(error);
  }
}

const deleteMyReview = async(token, deleteReviewId) => {
  try {
    require('dotenv').config();
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

    if(verifyToken) {
    await client.query(`
      DELETE FROM reviews_and_ratings WHERE id=${deleteReviewId} AND user_name='${verifyToken.name}'
      `)
    } else {
      return { message: 'Invalid user or review'}
    }
  } catch(error) {
    console.log(error);
  } 
}

const addLoggedInReview = async(token, movieId, movieTitle, movieReview, movieRating) => {
  try {
    require('dotenv').config();
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

    if (verifyToken) {
      const { rows } = await client.query(`
        INSERT INTO reviews_and_ratings (movie_id, user_name, movie_title, review, rating)
        VALUES (${movieId}, '${verifyToken.name}', '${movieTitle}', '${movieReview}', ${movieRating})
        RETURNING *;
      `)
      const review = rows[0];
      return review;
    } else {
      console.log(error);
    }
  } catch(error) {
    console.log(error);
  }
}

module.exports = { createReview, getOneMovieReview, getMyMovieReviews, deleteMyReview, addLoggedInReview };