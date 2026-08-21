import db from '../config/db.js';

export const getAllPerformanceReviews = async () => {
  const [rows] = await db.query(
    'SELECT * FROM performance_reviews ORDER BY review_date DESC, review_id DESC'
  );
  return rows;
};

export const getPerformanceReviewById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM performance_reviews WHERE review_id = ?',
    [id]
  );
  return rows[0];
};

export const generateMissingReviews = async (reviewCycleId, reviewerId) => {
  const [result] = await db.query(
    `INSERT INTO performance_reviews
      (review_cycle_id, employee_id, reviewer_id, status, review_date, comments)
     SELECT ?, e.employee_id, ?, 'Draft', CURDATE(), 'Automatically generated review'
     FROM employees e
     WHERE e.employment_status = 'Active'
       AND NOT EXISTS (
         SELECT 1 FROM performance_reviews pr
         WHERE pr.review_cycle_id = ? AND pr.employee_id = e.employee_id
       )`,
    [reviewCycleId, reviewerId, reviewCycleId]
  );
  return result.affectedRows;
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
  const [result] = await db.query(
    'DELETE FROM performance_reviews WHERE review_id = ?',
    [id]
  );
  return result.affectedRows;
};
