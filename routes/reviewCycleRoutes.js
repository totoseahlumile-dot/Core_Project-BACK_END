import express from 'express';
import {
  getReviewCycles,
  getReviewCycle,
  addReviewCycle,
  editReviewCycle,
  removeReviewCycle,
} from '../controllers/reviewCycleController.js';

const router = express.Router();

router.get('/', getReviewCycles);
router.get('/:id', getReviewCycle);
router.post('/', addReviewCycle);
router.put('/:id', editReviewCycle);
router.delete('/:id', removeReviewCycle);

export default router;
