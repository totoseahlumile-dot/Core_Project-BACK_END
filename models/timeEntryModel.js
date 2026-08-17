import db from '../config/db.js';

export const getAllTimeEntries = async () => {
  const [rows] = await db.query(
    'SELECT * FROM time_entries ORDER BY start_time DESC, time_entry_id DESC'
  );
  return rows;
};

export const getTimeEntryById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM time_entries WHERE time_entry_id = ?',
    [id]
  );
  return rows[0];
};

export const createTimeEntry = async (data) => {
  const {
    employee_id,
    project_name,
    task_name,
    start_time,
    end_time,
    duration_minutes,
    status,
    notes,
  } = data;

  const [result] = await db.query(
    `INSERT INTO time_entries (
      employee_id, project_name, task_name, start_time, end_time,
      duration_minutes, status, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [employee_id, project_name, task_name, start_time, end_time || null, duration_minutes || null, status || 'Running', notes || null]
  );
  return result.insertId;
};

export const updateTimeEntry = async (id, data) => {
  const {
    employee_id,
    project_name,
    task_name,
    start_time,
    end_time,
    duration_minutes,
    status,
    notes,
  } = data;

  const [result] = await db.query(
    `UPDATE time_entries
     SET employee_id = ?, project_name = ?, task_name = ?, start_time = ?, end_time = ?,
         duration_minutes = ?, status = ?, notes = ?
     WHERE time_entry_id = ?`,
    [employee_id, project_name, task_name, start_time, end_time || null, duration_minutes || null, status || 'Running', notes || null, id]
  );
  return result.affectedRows;
};

export const deleteTimeEntry = async (id) => {
  const [result] = await db.query(
    'DELETE FROM time_entries WHERE time_entry_id = ?',
    [id]
  );
  return result.affectedRows;
};
