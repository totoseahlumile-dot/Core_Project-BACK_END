import express from 'express';
import {
  getPerformanceReviews,
  getPerformanceReview,
  addPerformanceReview,
  editPerformanceReview,
  removePerformanceReview,
} from '../controllers/performanceReviewController.js';
import { validateId, validatePerformanceReview } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getPerformanceReviews);
router.get('/:id', validateId, getPerformanceReview);
router.post('/', validatePerformanceReview, addPerformanceReview);
router.put('/:id', validateId, validatePerformanceReview, editPerformanceReview);
router.delete('/:id', validateId, removePerformanceReview);

export default router;