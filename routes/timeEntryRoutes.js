import express from 'express';
import {
  getTimeEntries,
  getTimeEntry,
  addTimeEntry,
  editTimeEntry,
  removeTimeEntry,
} from '../controllers/timeEntryController.js';

const router = express.Router();

router.get('/', getTimeEntries);
router.get('/:id', getTimeEntry);
router.post('/', addTimeEntry);
router.put('/:id', editTimeEntry);
router.delete('/:id', removeTimeEntry);

export default router;
