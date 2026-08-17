const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Kirsten.L1404',
  database: process.env.DB_NAME || 'moderntech_hr',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;