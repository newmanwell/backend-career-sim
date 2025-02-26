const client = require('./client.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async(name, password) => {
  try {
    const encryptedPwd = await bcrypt.hash(password, 5);

    const { rows } = await client.query(`
      INSERT INTO users (name, password)
      VALUES ('${name}', '${encryptedPwd}')
      RETURNING *;
      `)
      const user = rows[0];
      return user;
  } catch(error) {
    console.log(error);
  }
}

const loginUser = async(name, password) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM users WHERE name='${name}';
      `);
      const user = rows[0];

      if (user) {
        const doesPasswordMatch = await bcrypt.compare(password, user.password);
        if(doesPasswordMatch) {
          require('dotenv').config();
          const token = await jwt.sign({ name: user.name }, process.env.JWT_SECRET);
          return token;
        } else {
          throw new Error('Login Not Valid');
        }
      } else {
        throw new Error('Login Not Valid');
      }
  } catch(error) {
    console.log(error);
  }
}

const getUserInfo = async(token) => {
  try {
    require('dotenv').config();
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await client.query(`
      SELECT id, name FROM users WHERE name='${verifyToken.name}'
      `);
    
      const user = rows[0];

      if (user) {
        return user
      } else {
        return { message: 'Invalid User'}
      }
    } catch(error) {
    console.log(error);
  }
}

module.exports = { createUser, loginUser, getUserInfo };