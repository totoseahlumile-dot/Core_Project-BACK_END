import db from '../config/db.js';

export const getAllPermissions = async () => {
  const [rows] = await db.query(
    'SELECT * FROM permissions ORDER BY permission_name'
  );
  return rows;
};

export const getPermissionById = async (id) => {
  if (!id) throw new Error('Permission ID is required');
  const [rows] = await db.query(
    'SELECT * FROM permissions WHERE permission_id = ?',
    [id]
  );
  return rows[0];
};

export const createPermission = async (data) => {
  const { permission_name, description } = data;
  
  if (!permission_name) throw new Error('Permission name is required');
  
  const [result] = await db.query(
    `INSERT INTO permissions (permission_name, description)
     VALUES (?, ?)`,
    [permission_name, description || null]
  );
  return result.insertId;
};

export const updatePermission = async (id, data) => {
  if (!id) throw new Error('Permission ID is required');
  
  const { permission_name, description } = data;
  const [result] = await db.query(
    `UPDATE permissions
     SET permission_name = ?, description = ?
     WHERE permission_id = ?`,
    [permission_name, description || null, id]
  );
  return result.affectedRows;
};

export const deletePermission = async (id) => {
  if (!id) throw new Error('Permission ID is required');
  const [result] = await db.query(
    'DELETE FROM permissions WHERE permission_id = ?',
    [id]
  );
  return result.affectedRows;
};