import express from 'express';
import {
  getTimesheets,
  getTimesheet,
  addTimesheet,
  editTimesheet,
  removeTimesheet,
} from '../controllers/timesheetController.js';

const router = express.Router();

router.get('/', getTimesheets);
router.get('/:id', getTimesheet);
router.post('/', addTimesheet);
router.put('/:id', editTimesheet);
router.delete('/:id', removeTimesheet);

export default router;
