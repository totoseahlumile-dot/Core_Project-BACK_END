import db from '../config/db.js';

export const getAllPerformanceReviews = async () => {
  const [rows] = await db.query(
    'SELECT * FROM performance_reviews ORDER BY review_date DESC, review_id DESC'
  );
  return rows;
};

export const getPerformanceReviewById = async (id) => {
  if (!id) throw new Error('Performance review ID is required');
  const [rows] = await db.query(
    'SELECT * FROM performance_reviews WHERE review_id = ?',
    [id]
  );
  return rows[0];
};

export const createPerformanceReview = async (data) => {
  const {
    review_cycle_id,
    employee_id,
    reviewer_id,
    rating,
    strengths,
    areas_for_improvement,
    comments,
    status,
    review_date,
  } = data;

  if (!review_cycle_id || !employee_id || !reviewer_id) {
    throw new Error('Review cycle ID, employee ID, and reviewer ID are required');
  }

  const [result] = await db.query(
    `INSERT INTO performance_reviews (
      review_cycle_id, employee_id, reviewer_id, rating,
      strengths, areas_for_improvement, comments, status, review_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [review_cycle_id, employee_id, reviewer_id, rating || null, strengths || null, areas_for_improvement || null, comments || null, status || 'Draft', review_date || null]
  );
  return result.insertId;
};

export const updatePerformanceReview = async (id, data) => {
  if (!id) throw new Error('Performance review ID is required');
  
  const {
    review_cycle_id,
    employee_id,
    reviewer_id,
    rating,
    strengths,
    areas_for_improvement,
    comments,
    status,
    review_date,
  } = data;

  const [result] = await db.query(
    `UPDATE performance_reviews
     SET review_cycle_id = ?, employee_id = ?, reviewer_id = ?, rating = ?,
         strengths = ?, areas_for_improvement = ?, comments = ?, status = ?, review_date = ?
     WHERE review_id = ?`,
    [review_cycle_id, employee_id, reviewer_id, rating || null, strengths || null, areas_for_improvement || null, comments || null, status || 'Draft', review_date || null, id]
  );
  return result.affectedRows;
};

export const deletePerformanceReview = async (id) => {
  if (!id) throw new Error('Performance review ID is required');
  const [result] = await db.query(
    'DELETE FROM performance_reviews WHERE review_id = ?',
    [id]
  );
  return result.affectedRows;
};