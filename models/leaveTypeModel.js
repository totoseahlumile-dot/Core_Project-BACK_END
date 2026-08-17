import db from '../config/db.js';

export const getAllLeaveTypes = async () => {
  const [rows] = await db.query(
    'SELECT * FROM leave_types ORDER BY leave_type_name'
  );
  return rows;
};

export const getLeaveTypeById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM leave_types WHERE leave_type_id = ?',
    [id]
  );
  return rows[0];
};

export const createLeaveType = async (data) => {
  const { leave_type_name, description, paid, default_days_per_year } = data;
  const [result] = await db.query(
    `INSERT INTO leave_types (leave_type_name, description, paid, default_days_per_year)
     VALUES (?, ?, ?, ?)`,
    [leave_type_name, description || null, paid === undefined ? 1 : paid, default_days_per_year ?? 0]
  );
  return result.insertId;
};

export const updateLeaveType = async (id, data) => {
  const { leave_type_name, description, paid, default_days_per_year } = data;
  const [result] = await db.query(
    `UPDATE leave_types
     SET leave_type_name = ?, description = ?, paid = ?, default_days_per_year = ?
     WHERE leave_type_id = ?`,
    [leave_type_name, description || null, paid === undefined ? 1 : paid, default_days_per_year ?? 0, id]
  );
  return result.affectedRows;
};

export const deleteLeaveType = async (id) => {
  const [result] = await db.query(
    'DELETE FROM leave_types WHERE leave_type_id = ?',
    [id]
  );
  return result.affectedRows;
};
