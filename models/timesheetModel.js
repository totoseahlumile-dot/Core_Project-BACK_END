import db from '../config/db.js';

export const getAllTimesheets = async () => {
  const [rows] = await db.query(
    'SELECT * FROM timesheets ORDER BY work_date DESC, timesheet_id DESC'
  );
  return rows;
};

export const getTimesheetById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM timesheets WHERE timesheet_id = ?',
    [id]
  );
  return rows[0];
};

export const createTimesheet = async (data) => {
  const { employee_id, work_date, hours_worked, overtime_hours, description, status, approved_by, approved_at } = data;
  const [result] = await db.query(
    `INSERT INTO timesheets (employee_id, work_date, hours_worked, overtime_hours, description, status, approved_by, approved_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [employee_id, work_date, hours_worked || 0, overtime_hours || 0, description || null, status || 'Draft', approved_by || null, approved_at || null]
  );
  return result.insertId;
};

export const updateTimesheet = async (id, data) => {
  const { employee_id, work_date, hours_worked, overtime_hours, description, status, approved_by, approved_at } = data;
  const [result] = await db.query(
    `UPDATE timesheets
     SET employee_id = ?, work_date = ?, hours_worked = ?, overtime_hours = ?, description = ?, status = ?, approved_by = ?, approved_at = ?
     WHERE timesheet_id = ?`,
    [employee_id, work_date, hours_worked || 0, overtime_hours || 0, description || null, status || 'Draft', approved_by || null, approved_at || null, id]
  );
  return result.affectedRows;
};

export const deleteTimesheet = async (id) => {
  const [result] = await db.query(
    'DELETE FROM timesheets WHERE timesheet_id = ?',
    [id]
  );
  return result.affectedRows;
};
