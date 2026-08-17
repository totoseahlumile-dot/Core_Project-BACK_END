import db from '../config/db.js';

export const getAllShifts = async () => {
  const [rows] = await db.query(
    'SELECT * FROM shifts ORDER BY shift_date DESC, shift_id DESC'
  );
  return rows;
};

export const getShiftById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM shifts WHERE shift_id = ?',
    [id]
  );
  return rows[0];
};

export const createShift = async (data) => {
  const { employee_id, shift_date, start_time, end_time, location, status, notes } = data;
  const [result] = await db.query(
    `INSERT INTO shifts (employee_id, shift_date, start_time, end_time, location, status, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [employee_id, shift_date, start_time, end_time, location || null, status || 'Scheduled', notes || null]
  );
  return result.insertId;
};

export const updateShift = async (id, data) => {
  const { employee_id, shift_date, start_time, end_time, location, status, notes } = data;
  const [result] = await db.query(
    `UPDATE shifts
     SET employee_id = ?, shift_date = ?, start_time = ?, end_time = ?,
         location = ?, status = ?, notes = ?
     WHERE shift_id = ?`,
    [employee_id, shift_date, start_time, end_time, location || null, status || 'Scheduled', notes || null, id]
  );
  return result.affectedRows;
};

export const deleteShift = async (id) => {
  const [result] = await db.query(
    'DELETE FROM shifts WHERE shift_id = ?',
    [id]
  );
  return result.affectedRows;
};
