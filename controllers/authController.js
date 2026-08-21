import * as User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    email = email.trim().toLowerCase();

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    const identity = await User.getRegistrationIdentity(email);
    if (!identity) {
      return res.status(403).json({ error: 'Your email is not in the employee directory. Contact HR.' });
    }

    const password_hash = await User.hashPassword(password);
    const userId = await User.createUser({
      employee_id: identity.employee_id,
      role_id: identity.role_id,
      email,
      password_hash,
    });

    res.status(201).json({ message: 'User registered successfully', user_id: userId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'This employee already has a user account.' });
    }
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    email = email.trim().toLowerCase();

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await User.comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.user_id, employee_id: user.employee_id, role: user.role_name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login successful',
      token,
      role: user.role_name,
      employee_id: user.employee_id,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password) {
      return res.status(400).json({ error: 'Current password and new password are required.' });
    }
    if (new_password.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters.' });
    }

    const user = await User.getUserWithPasswordById(req.user.id);
    if (!user || !(await User.comparePassword(current_password, user.password_hash))) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }
    if (await User.comparePassword(new_password, user.password_hash)) {
      return res.status(400).json({ error: 'New password must be different from the current password.' });
    }

    const passwordHash = await User.hashPassword(new_password);
    await User.updateUser(req.user.id, { password_hash: passwordHash });
    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    next(err);
  }
};
