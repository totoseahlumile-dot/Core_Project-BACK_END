import express from 'express';
import {
  getPerformanceReviews,
  getPerformanceReview,
  addPerformanceReview,
  editPerformanceReview,
  removePerformanceReview,
} from '../controllers/performanceReviewController.js';

const router = express.Router();

router.get('/', getPerformanceReviews);
router.get('/:id', getPerformanceReview);
router.post('/', addPerformanceReview);
router.put('/:id', editPerformanceReview);
router.delete('/:id', removePerformanceReview);

export default router;
