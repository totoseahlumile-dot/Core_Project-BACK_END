import express from 'express';
import {
  getShifts,
  getShift,
  addShift,
  editShift,
  removeShift,
} from '../controllers/shiftController.js';
import { validateId, validateShift } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getShifts);
router.get('/:id', validateId, getShift);
router.post('/', validateShift, addShift);
router.put('/:id', validateId, validateShift, editShift);
router.delete('/:id', validateId, removeShift);

export default router;