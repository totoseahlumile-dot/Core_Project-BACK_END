import * as Payroll from '../models/payrollModel.js';

export const getPayroll = async (req, res, next) => {
  try {
    const payroll = await Payroll.getAllPayroll();
    res.json(payroll);
  } catch (err) {
    next(err);
  }
};

export const getPayrollById = async (req, res, next) => {
  try {
    const record = await Payroll.getPayrollById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Payroll record not found' });
    res.json(record);
  } catch (err) {
    next(err);
  }
};

export const addPayroll = async (req, res, next) => {
  const { employee_id, pay_period_start, pay_period_end, base_salary } = req.body;

  if (!employee_id || !pay_period_start || !pay_period_end || base_salary == null) {
    return res.status(400).json({ error: 'Employee ID, pay period dates, and base salary are required' });
  }

  try {
    const id = await Payroll.createPayroll(req.body);
    res.status(201).json({ payroll_id: id, message: 'Payroll record created' });
  } catch (err) {
    next(err);
  }
};

export const editPayroll = async (req, res, next) => {
  try {
    const affected = await Payroll.updatePayroll(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Payroll record not found' });
    res.json({ message: 'Payroll record updated' });
  } catch (err) {
    next(err);
  }
};

export const removePayroll = async (req, res, next) => {
  try {
    const affected = await Payroll.deletePayroll(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Payroll record not found' });
    res.json({ message: 'Payroll record deleted' });
  } catch (err) {
    next(err);
  }
};
