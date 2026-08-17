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
  const { employee_id, week_start, week_end } = req.body;
  if (!employee_id || !week_start || !week_end) {
    return res.status(400).json({ error: 'Employee ID, week start, and week end are required' });
  }

  try {
    const id = await Timesheet.createTimesheet(req.body);
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
