import * as Timesheet from '../models/timesheetModel.js';

export const getTimesheets = async (req, res, next) => {
  try {
    const sheets = await Timesheet.getAllTimesheets();
    res.json(sheets);
  } catch (err) {
    next(err);
  }
};

export const getTimesheet = async (req, res, next) => {
  try {
    const sheet = await Timesheet.getTimesheetById(req.params.id);
    if (!sheet) return res.status(404).json({ error: 'Timesheet not found' });
    res.json(sheet);
  } catch (err) {
    next(err);
  }
};

export const addTimesheet = async (req, res, next) => {
  const { employee_id, work_date, hours_worked } = req.body;
  if (!employee_id || !work_date) {
    return res.status(400).json({ error: 'Employee ID and work date are required' });
  }
  if (!Number.isFinite(Number(hours_worked)) || Number(hours_worked) <= 0 || Number(hours_worked) > 24) {
    return res.status(400).json({ error: 'Hours worked must be between 0 and 24' });
  }

  // Employees submit logged hours for HR review. "Pending" is a UI label,
  // but the database enum intentionally calls that workflow state "Submitted".
  const status = req.body.status === 'Pending' ? 'Submitted' : (req.body.status || 'Submitted');
  if (!['Draft', 'Submitted', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid timesheet status' });
  }

  try {
    const id = await Timesheet.createTimesheet({ ...req.body, status });
    res.status(201).json({ timesheet_id: id, message: 'Timesheet created' });
  } catch (err) {
    next(err);
  }
};

export const editTimesheet = async (req, res, next) => {
  try {
    const affected = await Timesheet.updateTimesheet(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Timesheet not found' });
    res.json({ message: 'Timesheet updated' });
  } catch (err) {
    next(err);
  }
};

export const removeTimesheet = async (req, res, next) => {
  try {
    const affected = await Timesheet.deleteTimesheet(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Timesheet not found' });
    res.json({ message: 'Timesheet deleted' });
  } catch (err) {
    next(err);
  }
};
