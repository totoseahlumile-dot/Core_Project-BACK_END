import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import db from '../config/db.js';
import { AppError } from '../middleware/errorHandler.js';

// Login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const [users] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (users.length === 0) {
    throw new AppError('Invalid email or password', 401);
  }

  const user = users[0];

  // Check if user is active
  if (user.status !== 'Active') {
    throw new AppError('Account is not active. Please contact administrator.', 403);
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  // Update last login
  await db.query(
    'UPDATE users SET last_login = NOW() WHERE user_id = ?',
    [user.user_id]
  );

  // Generate JWT token
  const token = jwt.sign(
    { 
      userId: user.user_id, 
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  // Return user data (excluding password)
  const { password_hash, ...userWithoutPassword } = user;

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: userWithoutPassword
  });
});

// Register user
export const register = asyncHandler(async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;

  // Check if user already exists
  const [existingUsers] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (existingUsers.length > 0) {
    throw new AppError('User with this email already exists', 409);
  }

  // Hash password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create user
  const [result] = await db.query(
    `INSERT INTO users (email, password_hash, first_name, last_name, role, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [email, passwordHash, first_name, last_name, role || 'employee', 'Active']
  );

  // Get created user
  const [newUser] = await db.query(
    'SELECT * FROM users WHERE user_id = ?',
    [result.insertId]
  );

  const { password_hash, ...userWithoutPassword } = newUser[0];

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    user: userWithoutPassword
  });
});

// Logout user
export const logout = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Get current user
export const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const [users] = await db.query(
    'SELECT * FROM users WHERE user_id = ?',
    [userId]
  );

  if (users.length === 0) {
    throw new AppError('User not found', 404);
  }

  const { password_hash, ...userWithoutPassword } = users[0];

  res.json({
    success: true,
    user: userWithoutPassword
  });
});

// Change password
export const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { currentPassword, newPassword } = req.body;

  // Get user
  const [users] = await db.query(
    'SELECT * FROM users WHERE user_id = ?',
    [userId]
  );

  if (users.length === 0) {
    throw new AppError('User not found', 404);
  }

  const user = users[0];

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isPasswordValid) {
    throw new AppError('Current password is incorrect', 401);
  }

  // Hash new password
  const saltRounds = 10;
  const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

  // Update password
  await db.query(
    'UPDATE users SET password_hash = ? WHERE user_id = ?',
    [newPasswordHash, userId]
  );

  res.json({
    success: true,
    message: 'Password changed successfully'
  });
});

// Reset password (for admin)
export const resetPassword = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { newPassword } = req.body;

  // Check if user has permission (admin only)
  if (req.user.role !== 'admin') {
    throw new AppError('Permission denied. Admin access required.', 403);
  }

  // Check if user exists
  const [users] = await db.query(
    'SELECT * FROM users WHERE user_id = ?',
    [userId]
  );

  if (users.length === 0) {
    throw new AppError('User not found', 404);
  }

  // Hash new password
  const saltRounds = 10;
  const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

  // Update password
  await db.query(
    'UPDATE users SET password_hash = ? WHERE user_id = ?',
    [newPasswordHash, userId]
  );

  res.json({
    success: true,
    message: 'Password reset successfully'
  });
});