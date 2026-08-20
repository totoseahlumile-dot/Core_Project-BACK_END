import * as TimeEntry from '../models/timeEntryModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getTimeEntries = asyncHandler(async (req, res) => {
  const entries = await TimeEntry.getAllTimeEntries();
  res.json(entries);
});

export const getTimeEntry = asyncHandler(async (req, res) => {
  const entry = await TimeEntry.getTimeEntryById(req.params.id);
  if (!entry) {
    return res.status(404).json({ error: 'Time entry not found' });
  }
  res.json(entry);
});

export const addTimeEntry = asyncHandler(async (req, res) => {
  const { employee_id, work_date, clock_in, clock_out } = req.body;
  if (!employee_id || !work_date) {
    return res.status(400).json({ error: 'Employee ID and work date are required' });
  }

  const id = await TimeEntry.createTimeEntry(req.body);
  res.status(201).json({ time_entry_id: id, message: 'Time entry created' });
});

export const editTimeEntry = asyncHandler(async (req, res) => {
  const affected = await TimeEntry.updateTimeEntry(req.params.id, req.body);
  if (!affected) {
    return res.status(404).json({ error: 'Time entry not found' });
  }
  res.json({ message: 'Time entry updated' });
});

export const removeTimeEntry = asyncHandler(async (req, res) => {
  const affected = await TimeEntry.deleteTimeEntry(req.params.id);
  if (!affected) {
    return res.status(404).json({ error: 'Time entry not found' });
  }
  res.json({ message: 'Time entry deleted' });
});