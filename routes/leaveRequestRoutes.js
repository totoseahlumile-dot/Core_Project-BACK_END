import express from 'express';
import {
  getLeaveRequests,
  getLeaveRequest,
  addLeaveRequest,
  editLeaveRequest,
  removeLeaveRequest,
} from '../controllers/leaveRequestController.js';
import { validateId, validateLeaveRequest } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getLeaveRequests);
router.get('/:id', validateId, getLeaveRequest);
router.post('/', validateLeaveRequest, addLeaveRequest);
router.put('/:id', validateId, validateLeaveRequest, editLeaveRequest);
router.delete('/:id', validateId, removeLeaveRequest);

export default router;