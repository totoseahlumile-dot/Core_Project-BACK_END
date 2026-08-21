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

export const getTodayAttendance = async (employeeId) => {
  const [rows] = await db.query(
    'SELECT * FROM attendance WHERE employee_id = ? AND attendance_date = CURDATE() LIMIT 1',
    [employeeId]
  );
  return rows[0];
};

export const clockIn = async (employeeId) => {
  const current = await getTodayAttendance(employeeId);
  if (current) {
    if (current.check_in) return null;
    await db.query(
      "UPDATE attendance SET check_in = NOW(), status = 'Present' WHERE attendance_id = ?",
      [current.attendance_id]
    );
    return current.attendance_id;
  }
  const [result] = await db.query(
    "INSERT INTO attendance (employee_id, attendance_date, check_in, status) VALUES (?, CURDATE(), NOW(), 'Present')",
    [employeeId]
  );
  return result.insertId;
};

export const clockOut = async (employeeId) => {
  const current = await getTodayAttendance(employeeId);
  if (!current?.check_in || current.check_out) return null;
  const [result] = await db.query(
    'UPDATE attendance SET check_out = NOW() WHERE attendance_id = ?',
    [current.attendance_id]
  );
  return result.affectedRows ? current.attendance_id : null;
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
