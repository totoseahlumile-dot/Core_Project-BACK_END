import * as ReviewCycle from '../models/reviewCycleModel.js';

export const getReviewCycles = async (req, res, next) => {
  try {
    const cycles = await ReviewCycle.getAllReviewCycles();
    res.json(cycles);
  } catch (err) {
    next(err);
  }
};

export const getReviewCycle = async (req, res, next) => {
  try {
    const cycle = await ReviewCycle.getReviewCycleById(req.params.id);
    if (!cycle) return res.status(404).json({ error: 'Review cycle not found' });
    res.json(cycle);
  } catch (err) {
    next(err);
  }
};

export const addReviewCycle = async (req, res, next) => {
  const { cycle_name, start_date, end_date } = req.body;
  if (!cycle_name || !start_date || !end_date) {
    return res.status(400).json({ error: 'Cycle name, start date, and end date are required' });
  }

  try {
    const id = await ReviewCycle.createReviewCycle(req.body);
    res.status(201).json({ review_cycle_id: id, message: 'Review cycle created' });
  } catch (err) {
    next(err);
  }
};

export const editReviewCycle = async (req, res, next) => {
  try {
    const affected = await ReviewCycle.updateReviewCycle(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Review cycle not found' });
    res.json({ message: 'Review cycle updated' });
  } catch (err) {
    next(err);
  }
};

export const removeReviewCycle = async (req, res, next) => {
  try {
    const affected = await ReviewCycle.deleteReviewCycle(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Review cycle not found' });
    res.json({ message: 'Review cycle deleted' });
  } catch (err) {
    next(err);
  }
};
