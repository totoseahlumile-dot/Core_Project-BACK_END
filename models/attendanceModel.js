import db from '../config/db.js';

export const getAllAttendance = async () => {
  const [rows] = await db.query(
    'SELECT * FROM attendance ORDER BY attendance_date DESC, check_in DESC'
  );
  return rows;
};

export const getAttendanceById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM attendance WHERE attendance_id = ?',
    [id]
  );
  return rows[0];
};

export const createAttendance = async (data) => {
  const { employee_id, attendance_date, check_in, check_out, status, notes } = data;
  const [result] = await db.query(
    `INSERT INTO attendance (employee_id, attendance_date, check_in, check_out, status, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [employee_id, attendance_date, check_in || null, check_out || null, status || 'Present', notes || null]
  );
  return result.insertId;
};

export const updateAttendance = async (id, data) => {
  const { employee_id, attendance_date, check_in, check_out, status, notes } = data;
  const [result] = await db.query(
    `UPDATE attendance
     SET employee_id = ?, attendance_date = ?, check_in = ?, check_out = ?, status = ?, notes = ?
     WHERE attendance_id = ?`,
    [employee_id, attendance_date, check_in || null, check_out || null, status || 'Present', notes || null, id]
  );
  return result.affectedRows;
};

export const deleteAttendance = async (id) => {
  const [result] = await db.query(
    'DELETE FROM attendance WHERE attendance_id = ?',
    [id]
  );
  return result.affectedRows;
};
