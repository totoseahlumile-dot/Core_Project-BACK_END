import db from '../config/db.js';

export const getAllAuditLogs = async () => {
  const [rows] = await db.query(
    'SELECT * FROM audit_log ORDER BY created_at DESC, audit_id DESC'
  );
  return rows;
};

export const getAuditLogById = async (id) => {
  if (!id) throw new Error('Audit log ID is required');
  const [rows] = await db.query(
    'SELECT * FROM audit_log WHERE audit_id = ?',
    [id]
  );
  return rows[0];
};

export const createAuditLog = async (data) => {
  const { user_id, action_type, table_name, record_id, old_value, new_value } = data;
  
  if (!action_type || !table_name) {
    throw new Error('Action type and table name are required');
  }
  
  const [result] = await db.query(
    `INSERT INTO audit_log (user_id, action_type, table_name, record_id, old_value, new_value)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id || null, action_type, table_name, record_id || null, old_value || null, new_value || null]
  );
  return result.insertId;
};

export const updateAuditLog = async (id, data) => {
  if (!id) throw new Error('Audit log ID is required');
  
  const { user_id, action_type, table_name, record_id, old_value, new_value } = data;
  const [result] = await db.query(
    `UPDATE audit_log
     SET user_id = ?, action_type = ?, table_name = ?, record_id = ?, old_value = ?, new_value = ?
     WHERE audit_id = ?`,
    [user_id || null, action_type, table_name, record_id || null, old_value || null, new_value || null, id]
  );
  return result.affectedRows;
};

export const deleteAuditLog = async (id) => {
  if (!id) throw new Error('Audit log ID is required');
  const [result] = await db.query(
    'DELETE FROM audit_log WHERE audit_id = ?',
    [id]
  );
  return result.affectedRows;
};