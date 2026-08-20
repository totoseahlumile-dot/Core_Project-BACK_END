import express from 'express';
import {
  getAttendance,
  getAttendanceById,
  addAttendance,
  editAttendance,
  removeAttendance,
} from '../controllers/attendanceController.js';
import { validateId, validateAttendance } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getAttendance);
router.get('/:id', validateId, getAttendanceById);
router.post('/', validateAttendance, addAttendance);
router.put('/:id', validateId, validateAttendance, editAttendance);
router.delete('/:id', validateId, removeAttendance);

export default router;