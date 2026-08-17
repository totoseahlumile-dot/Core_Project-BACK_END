import db from '../config/db.js';

export const getAllReviewCycles = async () => {
  const [rows] = await db.query(
    'SELECT * FROM review_cycles ORDER BY start_date DESC, review_cycle_id DESC'
  );
  return rows;
};

export const getReviewCycleById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM review_cycles WHERE review_cycle_id = ?',
    [id]
  );
  return rows[0];
};

export const createReviewCycle = async (data) => {
  const { cycle_name, cycle_type, start_date, end_date, status } = data;
  const [result] = await db.query(
    `INSERT INTO review_cycles (cycle_name, cycle_type, start_date, end_date, status)
     VALUES (?, ?, ?, ?, ?)`,
    [cycle_name, cycle_type || 'Quarterly', start_date, end_date, status || 'Draft']
  );
  return result.insertId;
};

export const updateReviewCycle = async (id, data) => {
  const { cycle_name, cycle_type, start_date, end_date, status } = data;
  const [result] = await db.query(
    `UPDATE review_cycles
     SET cycle_name = ?, cycle_type = ?, start_date = ?, end_date = ?, status = ?
     WHERE review_cycle_id = ?`,
    [cycle_name, cycle_type || 'Quarterly', start_date, end_date, status || 'Draft', id]
  );
  return result.affectedRows;
};

export const deleteReviewCycle = async (id) => {
  const [result] = await db.query(
    'DELETE FROM review_cycles WHERE review_cycle_id = ?',
    [id]
  );
  return result.affectedRows;
};
