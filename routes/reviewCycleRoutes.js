import express from 'express';
import {
  getReviewCycles,
  getReviewCycle,
  addReviewCycle,
  editReviewCycle,
  removeReviewCycle,
} from '../controllers/reviewCycleController.js';
import { validateId, validateReviewCycle } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getReviewCycles);
router.get('/:id', validateId, getReviewCycle);
router.post('/', validateReviewCycle, addReviewCycle);
router.put('/:id', validateId, validateReviewCycle, editReviewCycle);
router.delete('/:id', validateId, removeReviewCycle);

export default router;