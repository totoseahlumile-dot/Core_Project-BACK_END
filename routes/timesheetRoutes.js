import express from 'express';
import {
  getTimesheets,
  getTimesheet,
  addTimesheet,
  editTimesheet,
  removeTimesheet,
} from '../controllers/timesheetController.js';
import { validateId, validateTimesheet } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getTimesheets);
router.get('/:id', validateId, getTimesheet);
router.post('/', validateTimesheet, addTimesheet);
router.put('/:id', validateId, validateTimesheet, editTimesheet);
router.delete('/:id', validateId, removeTimesheet);

export default router;