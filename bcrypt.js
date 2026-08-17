// npm install bcrypt

const bcrypt = require('bcrypt');

const password = 'password123'
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return
  }
  console.log(hash);
  
})