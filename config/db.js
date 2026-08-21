 
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const dotenvResult = dotenv.config();

// A process can inherit empty DB_* variables (for example, from a terminal
// profile). Treat those as unset so the project's .env values can be used.
for (const [key, value] of Object.entries(dotenvResult.parsed ?? {})) {
  if (!process.env[key]) process.env[key] = value;
}

// A pool reuses a bounded number of MySQL connections across concurrent HTTP
// requests. `waitForConnections` queues short bursts instead of opening an
// unbounded connection per request, which is especially important on hosted
// databases with strict connection limits.
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



 
