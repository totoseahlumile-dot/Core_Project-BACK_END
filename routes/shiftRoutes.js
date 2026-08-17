import express from 'express';
import {
  getShifts,
  getShift,
  addShift,
  editShift,
  removeShift,
} from '../controllers/shiftController.js';

const router = express.Router();

router.get('/', getShifts);
router.get('/:id', getShift);
router.post('/', addShift);
router.put('/:id', editShift);
router.delete('/:id', removeShift);

export default router;
