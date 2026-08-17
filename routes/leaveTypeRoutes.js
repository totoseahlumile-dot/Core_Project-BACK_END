import express from 'express';
import {
  getLeaveTypes,
  getLeaveType,
  addLeaveType,
  editLeaveType,
  removeLeaveType,
} from '../controllers/leaveTypeController.js';

const router = express.Router();

router.get('/', getLeaveTypes);
router.get('/:id', getLeaveType);
router.post('/', addLeaveType);
router.put('/:id', editLeaveType);
router.delete('/:id', removeLeaveType);

export default router;
