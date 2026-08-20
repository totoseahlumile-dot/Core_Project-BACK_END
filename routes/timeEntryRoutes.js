import express from 'express';
import {
  getTimeEntries,
  getTimeEntry,
  addTimeEntry,
  editTimeEntry,
  removeTimeEntry,
} from '../controllers/timeEntryController.js';
import { validateId, validateTimeEntry } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getTimeEntries);
router.get('/:id', validateId, getTimeEntry);
router.post('/', validateTimeEntry, addTimeEntry);
router.put('/:id', validateId, validateTimeEntry, editTimeEntry);
router.delete('/:id', validateId, removeTimeEntry);

export default router;