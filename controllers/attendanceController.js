import * as Attendance from '../models/attendanceModel.js';

export const getAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.getAllAttendance();
    res.json(attendance);
  } catch (err) {
    next(err);
  }
};

export const getAttendanceById = async (req, res, next) => {
  try {
    const record = await Attendance.getAttendanceById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Attendance record not found' });
    res.json(record);
  } catch (err) {
    next(err);
  }
};

export const addAttendance = async (req, res, next) => {
  const { employee_id, attendance_date, status } = req.body;

  if (!employee_id || !attendance_date) {
    return res.status(400).json({ error: 'Employee ID and attendance date are required' });
  }

  try {
    const id = await Attendance.createAttendance(req.body);
    res.status(201).json({ attendance_id: id, message: 'Attendance record created' });
  } catch (err) {
    next(err);
  }
};

export const editAttendance = async (req, res, next) => {
  try {
    const affected = await Attendance.updateAttendance(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Attendance record not found' });
    res.json({ message: 'Attendance record updated' });
  } catch (err) {
    next(err);
  }
};

export const removeAttendance = async (req, res, next) => {
  try {
    const affected = await Attendance.deleteAttendance(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Attendance record not found' });
    res.json({ message: 'Attendance record deleted' });
  } catch (err) {
    next(err);
  }
};
