import * as User from '../models/userModel.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const addUser = async (req, res, next) => {
  const { employee_id, role_id, email, password_hash } = req.body;
  if (!employee_id || !role_id || !email || !password_hash) {
    return res.status(400).json({
      error: 'employee_id, role_id, email, and password_hash are required',
    });
  }

  try {
    const id = await User.createUser(req.body);
    res.status(201).json({ user_id: id, message: 'User created' });
  } catch (err) {
    next(err);
  }
};

export const editUser = async (req, res, next) => {
  const updatableFields = ['employee_id', 'role_id', 'email', 'password_hash', 'is_active', 'last_login'];
  if (!updatableFields.some((field) => req.body[field] !== undefined)) {
    return res.status(400).json({ error: 'At least one user field is required' });
  }

  try {
    const affected = await User.updateUser(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated' });
  } catch (err) {
    next(err);
  }
};

export const removeUser = async (req, res, next) => {
  try {
    const affected = await User.deleteUser(req.params.id);
    if (!affected) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
