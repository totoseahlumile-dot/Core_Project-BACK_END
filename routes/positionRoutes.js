import express from 'express';
import {
  getPositions,
  getPosition,
  addPosition,
  editPosition,
  removePosition,
} from '../controllers/positionController.js';
import { validateId, validatePosition } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getPositions);
router.get('/:id', validateId, getPosition);
router.post('/', validatePosition, addPosition);
router.put('/:id', validateId, validatePosition, editPosition);
router.delete('/:id', validateId, removePosition);

export default router;