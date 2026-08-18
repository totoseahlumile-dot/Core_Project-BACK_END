import * as Shift from '../models/shiftModel.js';

export const getShifts = async (req, res, next) => {
  try {
    const shifts = await Shift.getAllShifts();
    res.json(shifts);
  } catch (err) {
    next(err);
  }
};

export const getShift = async (req, res, next) => {
  try {
    const shift = await Shift.getShiftById(req.params.id);
    if (!shift) return res.status(404).json({ error: 'Shift not found' });
    res.json(shift);
  } catch (err) {
    next(err);
  }
};

export const addShift = async (req, res, next) => {
  const { employee_id, shift_date, start_time, end_time } = req.body;
  if (!employee_id || !shift_date || !start_time || !end_time) {
    return res.status(400).json({ error: 'Employee ID, shift date, start time, and end time are required' });
  }

  try {
    const id = await Shift.createShift(req.body);
    res.status(201).json({ shift_id: id, message: 'Shift created' });
  } catch (err) {
    next(err);
  }
};

export const editShift = async (req, res, next) => {
  try {
    const affected = await Shift.updateShift(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Shift not found' });
    res.json({ message: 'Shift updated' });
  } catch (err) {
    next(err);
  }
};

export const removeShift = async (req, res, next) => {
  try {
    const affected = await Shift.deleteShift(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Shift not found' });
    res.json({ message: 'Shift deleted' });
  } catch (err) {
    next(err);
  }
};
