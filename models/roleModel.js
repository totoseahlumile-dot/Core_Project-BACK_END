import db from '../config/db.js';

export const getAllRoles = async () => {
  const [rows] = await db.query(
    'SELECT * FROM roles ORDER BY role_name'
  );
  return rows;
};

export const getRoleById = async (id) => {
  if (!id) throw new Error('Role ID is required');
  const [rows] = await db.query(
    'SELECT * FROM roles WHERE role_id = ?',
    [id]
  );
  return rows[0];
};

export const createRole = async (data) => {
  const { role_name, description } = data;
  
  if (!role_name) throw new Error('Role name is required');
  
  const [result] = await db.query(
    `INSERT INTO roles (role_name, description)
     VALUES (?, ?)`,
    [role_name, description || null]
  );
  return result.insertId;
};

export const updateRole = async (id, data) => {
  if (!id) throw new Error('Role ID is required');
  
  const { role_name, description } = data;
  const [result] = await db.query(
    `UPDATE roles
     SET role_name = ?, description = ?
     WHERE role_id = ?`,
    [role_name, description || null, id]
  );
  return result.affectedRows;
};

export const deleteRole = async (id) => {
  if (!id) throw new Error('Role ID is required');
  const [result] = await db.query(
    'DELETE FROM roles WHERE role_id = ?',
    [id]
  );
  return result.affectedRows;
};