import db from '../config/db.js';

export const getAllCompanySettings = async () => {
  const [rows] = await db.query(
    'SELECT * FROM company_settings ORDER BY setting_key'
  );
  return rows;
};

export const getCompanySettingById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM company_settings WHERE setting_id = ?',
    [id]
  );
  return rows[0];
};

export const createCompanySetting = async (data) => {
  const { setting_key, setting_value } = data;
  const [result] = await db.query(
    `INSERT INTO company_settings (setting_key, setting_value)
     VALUES (?, ?)`,
    [setting_key, setting_value]
  );
  return result.insertId;
};

export const updateCompanySetting = async (id, data) => {
  const { setting_key, setting_value } = data;
  const [result] = await db.query(
    `UPDATE company_settings
     SET setting_key = ?, setting_value = ?
     WHERE setting_id = ?`,
    [setting_key, setting_value, id]
  );
  return result.affectedRows;
};

export const deleteCompanySetting = async (id) => {
  const [result] = await db.query(
    'DELETE FROM company_settings WHERE setting_id = ?',
    [id]
  );
  return result.affectedRows;
};
