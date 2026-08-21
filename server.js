import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { authenticateToken, restrictNonHrAccess } from './middleware/authMiddleware.js';
import employeeRoutes from './routes/employeeRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import positionRoutes from './routes/positionRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import payrollRoutes from './routes/payrollRoutes.js';
import leaveRequestRoutes from './routes/leaveRequestRoutes.js';
import auditLogRoutes from './routes/auditLogRoutes.js';
import companySettingsRoutes from './routes/companySettingsRoutes.js';
import employeeSettingsRoutes from './routes/employeeSettingsRoutes.js';
import leaveTypeRoutes from './routes/leaveTypeRoutes.js';
import payslipRoutes from './routes/payslipRoutes.js';
import performanceReviewRoutes from './routes/performanceReviewRoutes.js';
import reviewCycleRoutes from './routes/reviewCycleRoutes.js';
import timeEntryRoutes from './routes/timeEntryRoutes.js';
import shiftRoutes from './routes/shiftRoutes.js';
import timesheetRoutes from './routes/timesheetRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';
import rolePermissionRoutes from './routes/rolePermissionRoutes.js';
import authRoutes from './routes/authRoutes.js';

import db from './config/db.js';
import errorHandler, { notFoundHandler } from './middleware/errorHandler.js';

const app = express();
const defaultOrigins = ['http://127.0.0.1:5501', 'http://localhost:5501'];
const allowedOrigins = (process.env.CORS_ORIGINS || defaultOrigins.join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

const port = Number(process.env.PORT || 3000);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', authenticateToken, restrictNonHrAccess);

app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/leave-requests', leaveRequestRoutes);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/company-settings', companySettingsRoutes);
app.use('/api/employee-settings', employeeSettingsRoutes);
app.use('/api/leave-types', leaveTypeRoutes);
app.use('/api/payslips', payslipRoutes);
app.use('/api/performance-reviews', performanceReviewRoutes);
app.use('/api/review-cycles', reviewCycleRoutes);
app.use('/api/time-entries', timeEntryRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/timesheets', timesheetRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/role-permissions', rolePermissionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`http://localhost:${port}`));
