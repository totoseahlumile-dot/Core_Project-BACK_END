import * as Shift from '../models/shiftModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getShifts = asyncHandler(async (req, res) => {
  const shifts = await Shift.getAllShifts();
  res.json(shifts);
});

export const getShift = asyncHandler(async (req, res) => {
  const shift = await Shift.getShiftById(req.params.id);
  if (!shift) {
    return res.status(404).json({ error: 'Shift not found' });
  }
  res.json(shift);
});

export const addShift = asyncHandler(async (req, res) => {
  const { shift_name, start_time, end_time } = req.body;
  if (!shift_name || !start_time || !end_time) {
    return res.status(400).json({ error: 'Shift name, start time, and end time are required' });
  }

  const id = await Shift.createShift(req.body);
  res.status(201).json({ shift_id: id, message: 'Shift created' });
});

export const editShift = asyncHandler(async (req, res) => {
  const affected = await Shift.updateShift(req.params.id, req.body);
  if (!affected) {
    return res.status(404).json({ error: 'Shift not found' });
  }
  res.json({ message: 'Shift updated' });
});

export const removeShift = asyncHandler(async (req, res) => {
  const affected = await Shift.deleteShift(req.params.id);
  if (!affected) {
    return res.status(404).json({ error: 'Shift not found' });
  }
  res.json({ message: 'Shift deleted' });
});