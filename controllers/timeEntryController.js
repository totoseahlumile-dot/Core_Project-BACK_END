import * as TimeEntry from '../models/timeEntryModel.js';

export const getTimeEntries = async (req, res, next) => {
  try {
    const entries = await TimeEntry.getAllTimeEntries();
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

export const getTimeEntry = async (req, res, next) => {
  try {
    const entry = await TimeEntry.getTimeEntryById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Time entry not found' });
    res.json(entry);
  } catch (err) {
    next(err);
  }
};

export const addTimeEntry = async (req, res, next) => {
  const { employee_id, work_date, clock_in, clock_out } = req.body;
  if (!employee_id || !work_date) {
    return res.status(400).json({ error: 'Employee ID and work date are required' });
  }

  try {
    const id = await TimeEntry.createTimeEntry(req.body);
    res.status(201).json({ time_entry_id: id, message: 'Time entry created' });
  } catch (err) {
    next(err);
  }
};

export const editTimeEntry = async (req, res, next) => {
  try {
    const affected = await TimeEntry.updateTimeEntry(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Time entry not found' });
    res.json({ message: 'Time entry updated' });
  } catch (err) {
    next(err);
  }
};

export const removeTimeEntry = async (req, res, next) => {
  try {
    const affected = await TimeEntry.deleteTimeEntry(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Time entry not found' });
    res.json({ message: 'Time entry deleted' });
  } catch (err) {
    next(err);
  }
};
