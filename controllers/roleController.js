import * as Role from '../models/roleModel.js';

export const getRoles = async (req, res, next) => {
  try {
    const roles = await Role.getAllRoles();
    res.json(roles);
  } catch (err) {
    next(err);
  }
};

export const getRole = async (req, res, next) => {
  try {
    const role = await Role.getRoleById(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    next(err);
  }
};

export const addRole = async (req, res, next) => {
  const { role_name } = req.body;
  if (!role_name) {
    return res.status(400).json({ error: 'Role name is required' });
  }

  try {
    const id = await Role.createRole(req.body);
    res.status(201).json({ role_id: id, message: 'Role created' });
  } catch (err) {
    next(err);
  }
};

export const editRole = async (req, res, next) => {
  try {
    const affected = await Role.updateRole(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Role not found' });
    res.json({ message: 'Role updated' });
  } catch (err) {
    next(err);
  }
};

export const removeRole = async (req, res, next) => {
  try {
    const affected = await Role.deleteRole(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Role not found' });
    res.json({ message: 'Role deleted' });
  } catch (err) {
    next(err);
  }
};
