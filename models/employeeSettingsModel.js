import db from '../config/db.js';

export const getAllEmployeeSettings = async () => {
  const [rows] = await db.query(
    'SELECT * FROM employee_settings ORDER BY employee_id, setting_key'
  );
  return rows;
};

export const getEmployeeSettingById = async (id) => {
  if (!id) throw new Error('Employee setting ID is required');
  const [rows] = await db.query(
    'SELECT * FROM employee_settings WHERE employee_setting_id = ?',
    [id]
  );
  return rows[0];
};

export const createEmployeeSetting = async (data) => {
  const { employee_id, setting_key, setting_value } = data;
  
  if (!employee_id || !setting_key || !setting_value) {
    throw new Error('Employee ID, setting key, and value are required');
  }
  
  const [result] = await db.query(
    `INSERT INTO employee_settings (employee_id, setting_key, setting_value)
     VALUES (?, ?, ?)`,
    [employee_id, setting_key, setting_value]
  );
  return result.insertId;
};

export const updateEmployeeSetting = async (id, data) => {
  if (!id) throw new Error('Employee setting ID is required');
  
  const { employee_id, setting_key, setting_value } = data;
  const [result] = await db.query(
    `UPDATE employee_settings
     SET employee_id = ?, setting_key = ?, setting_value = ?
     WHERE employee_setting_id = ?`,
    [employee_id, setting_key, setting_value, id]
  );
  return result.affectedRows;
};

export const deleteEmployeeSetting = async (id) => {
  if (!id) throw new Error('Employee setting ID is required');
  const [result] = await db.query(
    'DELETE FROM employee_settings WHERE employee_setting_id = ?',
    [id]
  );
  return result.affectedRows;
};