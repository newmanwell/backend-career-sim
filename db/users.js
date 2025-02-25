const client = require('./client.js');
const bcrypt = require('bcrypt');

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

module.exports = { createUser };