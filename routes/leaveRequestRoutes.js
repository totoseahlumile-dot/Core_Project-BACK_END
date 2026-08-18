import express from 'express';
import {
  getLeaveRequests,
  getLeaveRequest,
  addLeaveRequest,
  editLeaveRequest,
  removeLeaveRequest,
  updateLeaveRequestStatus,
} from '../controllers/leaveRequestController.js';

const router = express.Router();

router.get('/', getLeaveRequests);
router.get('/:id', getLeaveRequest);
router.post('/', addLeaveRequest);
router.put('/:id/status', updateLeaveRequestStatus);
router.put('/:id', editLeaveRequest);
router.delete('/:id', removeLeaveRequest);

export default router;
