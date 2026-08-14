import express from 'express';
import employeeRoutes from './routes/employeeRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/employees', employeeRoutes);

import db from './config/db.js';

app.get('/employees', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM employees');
    res.json({ connected: true, employeeCount: rows[0].count });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

app.listen(3000, () => console.log('http://localhost:3000'));