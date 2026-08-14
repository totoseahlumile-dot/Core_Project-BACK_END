import express from 'express';
import employeeRoutes from './routes/employeeRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import positionRoutes from './routes/positionRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import payrollRoutes from './routes/payrollRoutes.js';
import leaveRequestRoutes from './routes/leaveRequestRoutes.js';
import db from './config/db.js';
import errorHandler, { notFoundHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/leave-requests', leaveRequestRoutes);

const port = Number(process.env.PORT || 3000);

app.get('/employees', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM employees');
    res.json({ connected: true, employeeCount: rows[0].count });
  } catch (err) {
    next(err);
  }
});

app.get('/api/test-db', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM employees');
    res.json({ connected: true, employeeCount: rows[0].count });
  } catch (err) {
    next(err);
  }
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`http://localhost:${port}`));