import db from '../config/db.js';

export const getAllPositions = async () => {
  const [rows] = await db.query(
    'SELECT * FROM positions ORDER BY position_title'
  );
  return rows;
};

export const getPositionById = async (id) => {
  if (!id) throw new Error('Position ID is required');
  const [rows] = await db.query(
    'SELECT * FROM positions WHERE position_id = ?',
    [id]
  );
  return rows[0];
};

export const createPosition = async (data) => {
  const { department_id, position_title, description } = data;
  
  if (!department_id || !position_title) {
    throw new Error('Department ID and position title are required');
  }
  
  const [result] = await db.query(
    `INSERT INTO positions (department_id, position_title, description)
     VALUES (?, ?, ?)`,
    [department_id, position_title, description || null]
  );
  return result.insertId;
};

export const updatePosition = async (id, data) => {
  if (!id) throw new Error('Position ID is required');
  
  const { department_id, position_title, description } = data;
  const [result] = await db.query(
    `UPDATE positions
     SET department_id = ?, position_title = ?, description = ?
     WHERE position_id = ?`,
    [department_id, position_title, description || null, id]
  );
  return result.affectedRows;
};

export const deletePosition = async (id) => {
  if (!id) throw new Error('Position ID is required');
  const [result] = await db.query(
    'DELETE FROM positions WHERE position_id = ?',
    [id]
  );
  return result.affectedRows;
};