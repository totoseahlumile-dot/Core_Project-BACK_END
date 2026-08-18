import db from '../config/db.js';

export const getAllUsers = async () => {
  const [rows] = await db.query(
    `SELECT user_id, employee_id, role_id, email, is_active, last_login, created_at, updated_at
     FROM users
     ORDER BY email ASC`
  );
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await db.query(
    `SELECT user_id, employee_id, role_id, email, is_active, last_login, created_at, updated_at
     FROM users
     WHERE user_id = ?`,
    [id]
  );
  return rows[0];
};

export const createUser = async (data) => {
  const { employee_id, role_id, email, password_hash, is_active = true } = data;
  const [result] = await db.query(
    `INSERT INTO users (employee_id, role_id, email, password_hash, is_active)
     VALUES (?, ?, ?, ?, ?)`,
    [employee_id, role_id, email, password_hash, is_active]
  );
  return result.insertId;
};

export const updateUser = async (id, data) => {
  const allowedFields = ['employee_id', 'role_id', 'email', 'password_hash', 'is_active', 'last_login'];
  const fields = allowedFields.filter((field) => data[field] !== undefined);
  if (fields.length === 0) return 0;

  const values = fields.map((field) => data[field]);
  const [result] = await db.query(
    `UPDATE users
     SET ${fields.map((field) => `${field} = ?`).join(', ')}
     WHERE user_id = ?`,
    [...values, id]
  );
  return result.affectedRows;
};

export const deleteUser = async (id) => {
  const [result] = await db.query(
    'DELETE FROM users WHERE user_id = ?',
    [id]
  );
  return result.affectedRows;
};
