import express from 'express';
import {
  getPositions,
  getPosition,
  addPosition,
  editPosition,
  removePosition,
} from '../controllers/positionController.js';

const router = express.Router();

router.get('/', getPositions);
router.get('/:id', getPosition);
router.post('/', addPosition);
router.put('/:id', editPosition);
router.delete('/:id', removePosition);

export default router;
