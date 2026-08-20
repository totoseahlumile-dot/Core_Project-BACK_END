import db from '../config/db.js';

export const getAllDepartments = async () => {
  const [rows] = await db.query(
    'SELECT * FROM departments ORDER BY department_name'
  );
  return rows;
};

export const getDepartmentById = async (id) => {
  if (!id) throw new Error('Department ID is required');
  const [rows] = await db.query(
    'SELECT * FROM departments WHERE department_id = ?',
    [id]
  );
  return rows[0];
};

export const createDepartment = async (data) => {
  const { department_name, description } = data;
  
  if (!department_name) throw new Error('Department name is required');
  
  const [result] = await db.query(
    `INSERT INTO departments (department_name, description)
     VALUES (?, ?)`,
    [department_name, description || null]
  );
  return result.insertId;
};

export const updateDepartment = async (id, data) => {
  if (!id) throw new Error('Department ID is required');
  
  const { department_name, description } = data;
  const [result] = await db.query(
    `UPDATE departments
     SET department_name = ?, description = ?
     WHERE department_id = ?`,
    [department_name, description || null, id]
  );
  return result.affectedRows;
};

export const deleteDepartment = async (id) => {
  if (!id) throw new Error('Department ID is required');
  const [result] = await db.query(
    'DELETE FROM departments WHERE department_id = ?',
    [id]
  );
  return result.affectedRows;
};