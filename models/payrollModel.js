import db from '../config/db.js';

const normalizePayroll = (data = {}) => {
  const baseSalary = Number(data.base_salary ?? 0);
  const overtimePay = Number(data.overtime_pay ?? 0);
  const leaveDeductions = Number(data.leave_deductions ?? 0);
  const otherDeductions = Number(data.other_deductions ?? 0);
  const hoursWorked = Number(data.hours_worked ?? 0);
  const overtimeHours = Number(data.overtime_hours ?? 0);
  const grossPay = Number(data.gross_pay ?? (baseSalary + overtimePay));
  const netPay = Number(data.net_pay ?? (grossPay - leaveDeductions - otherDeductions));

  return {
    employee_id: data.employee_id,
    pay_period_start: data.pay_period_start,
    pay_period_end: data.pay_period_end,
    base_salary: baseSalary,
    hours_worked: hoursWorked,
    overtime_hours: overtimeHours,
    overtime_pay: overtimePay,
    leave_deductions: leaveDeductions,
    other_deductions: otherDeductions,
    gross_pay: grossPay,
    net_pay: netPay,
    payment_status: data.payment_status || 'Pending',
    processed_at: data.processed_at || null,
  };
};

export const getAllPayroll = async () => {
  const [rows] = await db.query(
    'SELECT * FROM payroll ORDER BY pay_period_end DESC, payroll_id DESC'
  );
  return rows;
};

export const getPayrollById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM payroll WHERE payroll_id = ?',
    [id]
  );
  return rows[0];
};

export const createPayroll = async (data) => {
  const payload = normalizePayroll(data);
  const [result] = await db.query(
    `INSERT INTO payroll (
      employee_id, pay_period_start, pay_period_end, base_salary,
      hours_worked, overtime_hours, overtime_pay, leave_deductions,
      other_deductions, gross_pay, net_pay, payment_status, processed_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.employee_id,
      payload.pay_period_start,
      payload.pay_period_end,
      payload.base_salary,
      payload.hours_worked,
      payload.overtime_hours,
      payload.overtime_pay,
      payload.leave_deductions,
      payload.other_deductions,
      payload.gross_pay,
      payload.net_pay,
      payload.payment_status,
      payload.processed_at,
    ]
  );
  return result.insertId;
};

export const updatePayroll = async (id, data) => {
  const payload = normalizePayroll(data);
  const [result] = await db.query(
    `UPDATE payroll
     SET employee_id = ?, pay_period_start = ?, pay_period_end = ?, base_salary = ?,
         hours_worked = ?, overtime_hours = ?, overtime_pay = ?, leave_deductions = ?,
         other_deductions = ?, gross_pay = ?, net_pay = ?, payment_status = ?, processed_at = ?
     WHERE payroll_id = ?`,
    [
      payload.employee_id,
      payload.pay_period_start,
      payload.pay_period_end,
      payload.base_salary,
      payload.hours_worked,
      payload.overtime_hours,
      payload.overtime_pay,
      payload.leave_deductions,
      payload.other_deductions,
      payload.gross_pay,
      payload.net_pay,
      payload.payment_status,
      payload.processed_at,
      id,
    ]
  );
  return result.affectedRows;
};

export const deletePayroll = async (id) => {
  const [result] = await db.query(
    'DELETE FROM payroll WHERE payroll_id = ?',
    [id]
  );
  return result.affectedRows;
};
