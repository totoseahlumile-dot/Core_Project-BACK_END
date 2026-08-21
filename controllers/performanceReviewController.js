import * as PerformanceReview from '../models/performanceReviewModel.js';
import * as ReviewCycle from '../models/reviewCycleModel.js';

export const getPerformanceReviews = async (req, res, next) => {
  try {
    const reviews = await PerformanceReview.getAllPerformanceReviews();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

export const getPerformanceReview = async (req, res, next) => {
  try {
    const review = await PerformanceReview.getPerformanceReviewById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Performance review not found' });
    res.json(review);
  } catch (err) {
    next(err);
  }
};

export const generatePerformanceReviews = async (req, res, next) => {
  try {
    const cycles = await ReviewCycle.getAllReviewCycles();
    const cycle = req.body.review_cycle_id
      ? cycles.find(item => Number(item.review_cycle_id) === Number(req.body.review_cycle_id))
      : cycles.find(item => item.status === 'Active') || cycles[0];
    if (!cycle) return res.status(400).json({ error: 'Create a review cycle first.' });
    const created = await PerformanceReview.generateMissingReviews(cycle.review_cycle_id, req.user.employee_id);
    res.status(201).json({ message: `${created} employee reviews generated.`, created, review_cycle_id: cycle.review_cycle_id });
  } catch (err) { next(err); }
};

export const addPerformanceReview = async (req, res, next) => {
  const { review_cycle_id, employee_id, reviewer_id } = req.body;
  if (!review_cycle_id || !employee_id || !reviewer_id) {
    return res.status(400).json({ error: 'Review cycle ID, employee ID, and reviewer ID are required' });
  }

  try {
    const id = await PerformanceReview.createPerformanceReview(req.body);
    res.status(201).json({ review_id: id, message: 'Performance review created' });
  } catch (err) {
    next(err);
  }
};

export const editPerformanceReview = async (req, res, next) => {
  try {
    const affected = await PerformanceReview.updatePerformanceReview(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Performance review not found' });
    res.json({ message: 'Performance review updated' });
  } catch (err) {
    next(err);
  }
};

export const removePerformanceReview = async (req, res, next) => {
  try {
    const affected = await PerformanceReview.deletePerformanceReview(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Performance review not found' });
    res.json({ message: 'Performance review deleted' });
  } catch (err) {
    next(err);
  }
};
