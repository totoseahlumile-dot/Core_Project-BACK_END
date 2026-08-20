import db from '../config/db.js';

export const getAllLeaveRequests = async () => {
  const [rows] = await db.query(
    'SELECT * FROM leave_requests ORDER BY start_date DESC, leave_request_id DESC'
  );
  return rows;
};

export const getLeaveRequestById = async (id) => {
  if (!id) throw new Error('Leave request ID is required');
  const [rows] = await db.query(
    'SELECT * FROM leave_requests WHERE leave_request_id = ?',
    [id]
  );
  return rows[0];
};

export const createLeaveRequest = async (data) => {
  const {
    employee_id,
    leave_type_id,
    start_date,
    end_date,
    reason,
    status,
    reviewed_by,
    reviewed_at,
  } = data;

  if (!employee_id || !leave_type_id || !start_date || !end_date) {
    throw new Error('Employee ID, leave type, start date, and end date are required');
  }

  const [result] = await db.query(
    `INSERT INTO leave_requests (
      employee_id, leave_type_id, start_date, end_date,
      reason, status, reviewed_by, reviewed_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [employee_id, leave_type_id, start_date, end_date, reason || null, status || 'Pending', reviewed_by || null, reviewed_at || null]
  );
  return result.insertId;
};

export const updateLeaveRequest = async (id, data) => {
  if (!id) throw new Error('Leave request ID is required');
  
  const {
    employee_id,
    leave_type_id,
    start_date,
    end_date,
    reason,
    status,
    reviewed_by,
    reviewed_at,
  } = data;

  const [result] = await db.query(
    `UPDATE leave_requests
     SET employee_id = ?, leave_type_id = ?, start_date = ?, end_date = ?,
         reason = ?, status = ?, reviewed_by = ?, reviewed_at = ?
     WHERE leave_request_id = ?`,
    [employee_id, leave_type_id, start_date, end_date, reason || null, status || 'Pending', reviewed_by || null, reviewed_at || null, id]
  );
  return result.affectedRows;
};

export const deleteLeaveRequest = async (id) => {
  if (!id) throw new Error('Leave request ID is required');
  const [result] = await db.query(
    'DELETE FROM leave_requests WHERE leave_request_id = ?',
    [id]
  );
  return result.affectedRows;
};