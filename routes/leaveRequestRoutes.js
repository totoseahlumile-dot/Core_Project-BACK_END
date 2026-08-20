import express from 'express';

import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
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
router.put('/:id/status', authenticateToken, authorizeRoles('HR Manager', 'Manager'), updateLeaveRequestStatus);
router.put('/:id', editLeaveRequest);
router.delete('/:id', removeLeaveRequest);

export default router;
