import express from 'express';
import {
  getLeaveTypes,
  getLeaveType,
  addLeaveType,
  editLeaveType,
  removeLeaveType,
} from '../controllers/leaveTypeController.js';
import { validateId, validateLeaveType } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getLeaveTypes);
router.get('/:id', validateId, getLeaveType);
router.post('/', validateLeaveType, addLeaveType);
router.put('/:id', validateId, validateLeaveType, editLeaveType);
router.delete('/:id', validateId, removeLeaveType);

export default router;