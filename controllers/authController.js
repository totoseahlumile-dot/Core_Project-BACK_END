import * as User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    let { email, password, employee_id, role_id } = req.body;

    if (!email || !password || !employee_id || !role_id) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    email = email.trim().toLowerCase();

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    const password_hash = await User.hashPassword(password);
    const userId = await User.createUser({ employee_id, role_id, email, password_hash });

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
      { id: user.user_id, role: user.role_name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ message: 'Login successful', token, role: user.role_name });
  } catch (err) {
    next(err);
  }
};