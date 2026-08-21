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
    const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
    res.json(isHr ? attendance : attendance.filter(record => Number(record.employee_id) === Number(req.user.employee_id)));
  } catch (err) {
    next(err);
  }
};

// The browser sends a time input as HH:mm, while MySQL stores check-in/out as
// DATETIME. Combining it with the validated attendance date at this boundary
// keeps storage consistent and prevents implicit, server-dependent conversion.
const normalizeDateTime = (date, time) => {
  if (!time) return null;
  const match = String(time).match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return null;
  const [, hour, minute, second = '00'] = match;
  if (Number(hour) > 23 || Number(minute) > 59 || Number(second) > 59) return null;
  return `${date} ${hour.padStart(2, '0')}:${minute}:${second}`;
};

export const clockIn = async (req, res, next) => {
  try {
    const id = await Attendance.clockIn(req.user.employee_id);
    if (!id) return res.status(409).json({ error: 'You are already clocked in today.' });
    const record = await Attendance.getTodayAttendance(req.user.employee_id);
    res.status(201).json({ message: 'Clock-in recorded.', attendance: record });
  } catch (err) { next(err); }
};

export const clockOut = async (req, res, next) => {
  try {
    const id = await Attendance.clockOut(req.user.employee_id);
    if (!id) return res.status(409).json({ error: 'Clock in first, or you have already clocked out.' });
    const record = await Attendance.getTodayAttendance(req.user.employee_id);
    res.json({ message: 'Clock-out recorded.', attendance: record });
  } catch (err) { next(err); }
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

  const checkIn = normalizeDateTime(normalizedAttendanceDate, req.body.check_in);
  const checkOut = normalizeDateTime(normalizedAttendanceDate, req.body.check_out);
  if ((req.body.check_in && !checkIn) || (req.body.check_out && !checkOut)) {
    return res.status(400).json({ error: 'Clock times must use a valid 24-hour HH:mm format' });
  }

  try {
    const id = await Attendance.createAttendance({ ...req.body, attendance_date: normalizedAttendanceDate, check_in: checkIn, check_out: checkOut });
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
