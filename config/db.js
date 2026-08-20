 
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const dotenvResult = dotenv.config();

// A process can inherit empty DB_* variables (for example, from a terminal
// profile). Treat those as unset so the project's .env values can be used.
for (const [key, value] of Object.entries(dotenvResult.parsed ?? {})) {
  if (!process.env[key]) process.env[key] = value;
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3307),
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;



 
