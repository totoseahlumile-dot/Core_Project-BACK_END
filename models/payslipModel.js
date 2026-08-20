import db from '../config/db.js';

export const getAllPayslips = async () => {
  const [rows] = await db.query(
    'SELECT * FROM payslips ORDER BY generated_at DESC, payslip_id DESC'
  );
  return rows;
};

export const getPayslipById = async (id) => {
  if (!id) throw new Error('Payslip ID is required');
  const [rows] = await db.query(
    'SELECT * FROM payslips WHERE payslip_id = ?',
    [id]
  );
  return rows[0];
};

export const createPayslip = async (data) => {
  const { payroll_id, payslip_number, file_path } = data;
  
  if (!payroll_id || !payslip_number) {
    throw new Error('Payroll ID and payslip number are required');
  }
  
  const [result] = await db.query(
    `INSERT INTO payslips (payroll_id, payslip_number, file_path)
     VALUES (?, ?, ?)`,
    [payroll_id, payslip_number, file_path || null]
  );
  return result.insertId;
};

export const updatePayslip = async (id, data) => {
  if (!id) throw new Error('Payslip ID is required');
  
  const { payroll_id, payslip_number, file_path } = data;
  const [result] = await db.query(
    `UPDATE payslips
     SET payroll_id = ?, payslip_number = ?, file_path = ?
     WHERE payslip_id = ?`,
    [payroll_id, payslip_number, file_path || null, id]
  );
  return result.affectedRows;
};

export const deletePayslip = async (id) => {
  if (!id) throw new Error('Payslip ID is required');
  const [result] = await db.query(
    'DELETE FROM payslips WHERE payslip_id = ?',
    [id]
  );
  return result.affectedRows;
};