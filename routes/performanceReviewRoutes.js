import express from 'express';
import {
  getPerformanceReviews,
  getPerformanceReview,
  addPerformanceReview,
  editPerformanceReview,
  removePerformanceReview,
  generatePerformanceReviews,
} from '../controllers/performanceReviewController.js';
import { authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPerformanceReviews);
router.post('/generate', authorizeRoles('HR Manager'), generatePerformanceReviews);
router.get('/:id', getPerformanceReview);
router.post('/', addPerformanceReview);
router.put('/:id', editPerformanceReview);
router.delete('/:id', removePerformanceReview);

export default router;
