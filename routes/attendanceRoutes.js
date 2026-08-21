import express from 'express';
import {
  getAttendance,
  getAttendanceById,
  addAttendance,
  editAttendance,
  removeAttendance,
  clockIn,
  clockOut,
} from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/', getAttendance);
router.post('/clock-in', clockIn);
router.post('/clock-out', clockOut);
router.get('/:id', getAttendanceById);
router.post('/', addAttendance);
router.put('/:id', editAttendance);
router.delete('/:id', removeAttendance);

export default router;
