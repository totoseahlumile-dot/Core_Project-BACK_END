import db from '../config/db.js';

export const getAllPayslips = async () => {
  const [rows] = await db.query(
    'SELECT * FROM payslips ORDER BY generated_at DESC, payslip_id DESC'
  );
  return rows;
};

export const getPayslipsByEmployeeId = async (employeeId) => {
  const [rows] = await db.query(
    `SELECT ps.* FROM payslips ps
     JOIN payroll p ON p.payroll_id = ps.payroll_id
     WHERE p.employee_id = ?
     ORDER BY ps.generated_at DESC, ps.payslip_id DESC`,
    [employeeId]
  );
  return rows;
};

export const getPayslipById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM payslips WHERE payslip_id = ?',
    [id]
  );
  return rows[0];
};

export const payslipBelongsToEmployee = async (id, employeeId) => {
  const [rows] = await db.query(
    `SELECT ps.payslip_id FROM payslips ps
     JOIN payroll p ON p.payroll_id = ps.payroll_id
     WHERE ps.payslip_id = ? AND p.employee_id = ?`,
    [id, employeeId]
  );
  return Boolean(rows[0]);
};

export const createPayslip = async (data) => {
  const { payroll_id, payslip_number, file_path } = data;
  const [result] = await db.query(
    `INSERT INTO payslips (payroll_id, payslip_number, file_path)
     VALUES (?, ?, ?)`,
    [payroll_id, payslip_number, file_path || null]
  );
  return result.insertId;
};

export const updatePayslip = async (id, data) => {
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
  const [result] = await db.query(
    'DELETE FROM payslips WHERE payslip_id = ?',
    [id]
  );
  return result.affectedRows;
};
