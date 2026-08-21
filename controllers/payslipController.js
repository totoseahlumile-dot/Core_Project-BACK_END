import * as Payslip from '../models/payslipModel.js';

export const getPayslips = async (req, res, next) => {
  try {
    const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
    const slips = isHr
      ? await Payslip.getAllPayslips()
      : await Payslip.getPayslipsByEmployeeId(req.user.employee_id);
    res.json(slips);
  } catch (err) {
    next(err);
  }
};

export const getPayslip = async (req, res, next) => {
  try {
    const slip = await Payslip.getPayslipById(req.params.id);
    if (!slip) return res.status(404).json({ error: 'Payslip not found' });
    const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
    if (!isHr && !(await Payslip.payslipBelongsToEmployee(req.params.id, req.user.employee_id))) {
      return res.status(403).json({ error: 'You may only view your own payslips' });
    }
    res.json(slip);
  } catch (err) {
    next(err);
  }
};

export const addPayslip = async (req, res, next) => {
  const { payroll_id, payslip_number } = req.body;
  if (!payroll_id || !payslip_number) {
    return res.status(400).json({ error: 'Payroll ID and payslip number are required' });
  }

  try {
    const id = await Payslip.createPayslip(req.body);
    res.status(201).json({ payslip_id: id, message: 'Payslip created' });
  } catch (err) {
    next(err);
  }
};

export const editPayslip = async (req, res, next) => {
  try {
    const affected = await Payslip.updatePayslip(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Payslip not found' });
    res.json({ message: 'Payslip updated' });
  } catch (err) {
    next(err);
  }
};

export const removePayslip = async (req, res, next) => {
  try {
    const affected = await Payslip.deletePayslip(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Payslip not found' });
    res.json({ message: 'Payslip deleted' });
  } catch (err) {
    next(err);
  }
};
