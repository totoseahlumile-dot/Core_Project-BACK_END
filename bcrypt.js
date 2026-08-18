// npm install bcrypt mysql2 dotenv
// npm install express
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'moderntech_hr',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;

const bcrypt = require('bcrypt');

async function generateHash(password) {
  const hash = await bycrypt.hash(password, 10);

  console.log('Password:', password);
  console.log('Hash:', hash);  
}

generateHash('YourPassword123!')