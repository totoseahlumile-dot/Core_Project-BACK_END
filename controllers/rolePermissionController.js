import * as RolePermission from '../models/rolePermissionModel.js';

export const getRolePermissions = async (req, res, next) => {
  try {
    const rows = await RolePermission.getAllRolePermissions();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const getRolePermission = async (req, res, next) => {
  try {
    const row = await RolePermission.getRolePermissionById(req.params.roleId, req.params.permissionId);
    if (!row) return res.status(404).json({ error: 'Role permission not found' });
    res.json(row);
  } catch (err) {
    next(err);
  }
};

export const addRolePermission = async (req, res, next) => {
  const { role_id, permission_id } = req.body;
  if (!role_id || !permission_id) {
    return res.status(400).json({ error: 'Role ID and permission ID are required' });
  }

  try {
    const affected = await RolePermission.addRolePermission(req.body);
    res.status(201).json({ message: 'Role permission added', affectedRows: affected });
  } catch (err) {
    next(err);
  }
};

export const removeRolePermission = async (req, res, next) => {
  try {
    const affected = await RolePermission.removeRolePermission(req.params.roleId, req.params.permissionId);
    if (!affected) return res.status(404).json({ error: 'Role permission not found' });
    res.json({ message: 'Role permission removed' });
  } catch (err) {
    next(err);
  }
};
