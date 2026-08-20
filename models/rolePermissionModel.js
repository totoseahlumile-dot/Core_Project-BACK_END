import db from '../config/db.js';

export const getAllRolePermissions = async () => {
  const [rows] = await db.query(
    'SELECT * FROM role_permissions ORDER BY role_id, permission_id'
  );
  return rows;
};

export const getRolePermissionById = async (roleId, permissionId) => {
  if (!roleId || !permissionId) {
    throw new Error('Role ID and Permission ID are required');
  }
  const [rows] = await db.query(
    'SELECT * FROM role_permissions WHERE role_id = ? AND permission_id = ?',
    [roleId, permissionId]
  );
  return rows[0];
};

export const addRolePermission = async (data) => {
  const { role_id, permission_id } = data;
  
  if (!role_id || !permission_id) {
    throw new Error('Role ID and Permission ID are required');
  }
  
  const [result] = await db.query(
    `INSERT INTO role_permissions (role_id, permission_id)
     VALUES (?, ?)`,
    [role_id, permission_id]
  );
  return result.affectedRows;
};

export const removeRolePermission = async (roleId, permissionId) => {
  if (!roleId || !permissionId) {
    throw new Error('Role ID and Permission ID are required');
  }
  const [result] = await db.query(
    'DELETE FROM role_permissions WHERE role_id = ? AND permission_id = ?',
    [roleId, permissionId]
  );
  return result.affectedRows;
};