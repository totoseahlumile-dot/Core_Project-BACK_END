import * as Attendance from '../models/attendanceModel.js';

const normalizeDate = (value) => {
  if (typeof value !== 'string') return null;

  const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) return null;

  const [, year, month, day] = match;
  const date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  if (date.getUTCFullYear() !== Number(year) || date.getUTCMonth() + 1 !== Number(month) || date.getUTCDate() !== Number(day)) return null;

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

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
  const allowedStatuses = ['Present', 'Absent', 'Late', 'Half Day', 'Remote', 'On Leave'];

  if (!employee_id || !attendance_date || !status) {
    return res.status(400).json({ error: 'Employee ID, attendance date, and status are required' });
  }

  const normalizedAttendanceDate = normalizeDate(attendance_date);
  if (!normalizedAttendanceDate) {
    return res.status(400).json({ error: 'Attendance date must be a valid calendar date' });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid attendance status' });
  }

  try {
    const id = await Attendance.createAttendance({ ...req.body, attendance_date: normalizedAttendanceDate });
    res.status(201).json({ attendance_id: id, message: 'Attendance logged' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Attendance already logged for this employee on this date' });
    }
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Employee does not exist' });
    }
    next(err);
  }
};

/*export const addAttendance = async (req, res, next) => {
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
};*/

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
