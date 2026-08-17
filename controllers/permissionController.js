import * as Permission from '../models/permissionModel.js';

export const getPermissions = async (req, res, next) => {
  try {
    const permissions = await Permission.getAllPermissions();
    res.json(permissions);
  } catch (err) {
    next(err);
  }
};

export const getPermission = async (req, res, next) => {
  try {
    const permission = await Permission.getPermissionById(req.params.id);
    if (!permission) return res.status(404).json({ error: 'Permission not found' });
    res.json(permission);
  } catch (err) {
    next(err);
  }
};

export const addPermission = async (req, res, next) => {
  const { permission_name } = req.body;
  if (!permission_name) {
    return res.status(400).json({ error: 'Permission name is required' });
  }

  try {
    const id = await Permission.createPermission(req.body);
    res.status(201).json({ permission_id: id, message: 'Permission created' });
  } catch (err) {
    next(err);
  }
};

export const editPermission = async (req, res, next) => {
  try {
    const affected = await Permission.updatePermission(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Permission not found' });
    res.json({ message: 'Permission updated' });
  } catch (err) {
    next(err);
  }
};

export const removePermission = async (req, res, next) => {
  try {
    const affected = await Permission.deletePermission(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Permission not found' });
    res.json({ message: 'Permission deleted' });
  } catch (err) {
    next(err);
  }
};
