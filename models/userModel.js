import db from '../config/db.js';

export const getAllUsers = async () => {
  const [rows] = await db.query(
    'SELECT * FROM users ORDER BY user_name'
  );
  return rows;
};

export const getUserById = async (id) => {
  if (!id) throw new Error('User ID is required');
  const [rows] = await db.query(
    'SELECT * FROM users WHERE user_id = ?',
    [id]
  );
  return rows[0];
};

export const createUser = async (data) => {
  const { user_name, user_email } = data;
  
  if (!user_name || !user_email) {
    throw new Error('Username and email are required');
  }
  
  const [result] = await db.query(
    `INSERT INTO users (user_name, user_email)
     VALUES (?, ?)`,
    [user_name, user_email]
  );
  return result.insertId;
};

export const updateUser = async (id, data) => {
  if (!id) throw new Error('User ID is required');
  
  const { user_name, user_email } = data;
  const [result] = await db.query(
    `UPDATE users
     SET user_name = ?, user_email = ?
     WHERE user_id = ?`,
    [user_name, user_email, id]
  );
  return result.affectedRows;
};

export const deleteUser = async (id) => {
  if (!id) throw new Error('User ID is required');
  const [result] = await db.query(
    'DELETE FROM users WHERE user_id = ?',
    [id]
  );
  return result.affectedRows;
};