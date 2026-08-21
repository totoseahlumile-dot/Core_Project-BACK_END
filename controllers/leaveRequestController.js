import * as LeaveRequest from '../models/leaveRequestModel.js';

const isValidDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

export const getLeaveRequests = async (req, res, next) => {
  try {
    const records = await LeaveRequest.getAllLeaveRequests();
    const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
    res.json(isHr ? records : records.filter(record => Number(record.employee_id) === Number(req.user.employee_id)));
  } catch (err) {
    next(err);
  }
};

export const getLeaveRequest = async (req, res, next) => {
  try {
    const record = await LeaveRequest.getLeaveRequestById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Leave request not found' });
    const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
    if (!isHr && Number(record.employee_id) !== Number(req.user.employee_id)) {
      return res.status(403).json({ error: 'You may only view your own leave requests' });
    }
    res.json(record);
  } catch (err) {
    next(err);
  }
};

export const addLeaveRequest = async (req, res, next) => {
  const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
  if (!isHr) req.body.employee_id = req.user.employee_id;
  const { employee_id, leave_type_id, start_date, end_date } = req.body;

  if (!employee_id || !leave_type_id || !start_date || !end_date) {
    return res.status(400).json({ error: 'Employee ID, leave type, start date, and end date are required' });
  }

  if (!isValidDate(start_date) || !isValidDate(end_date)) {
    return res.status(400).json({ error: 'Start date and end date must use YYYY-MM-DD format' });
  }

  if (end_date < start_date) {
    return res.status(400).json({ error: 'End date cannot be before start date' });
  }

  try {
    const id = await LeaveRequest.createLeaveRequest(req.body);
    res.status(201).json({ leave_request_id: id, message: 'Leave request created' });
  } catch (err) {
    next(err);
  }
};

export const updateLeaveRequestStatus = async (req, res, next) => {
  const { status, reviewed_by } = req.body;
  const allowedStatuses = ['Approved', 'Denied', 'Cancelled'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status must be Approved, Denied, or Cancelled' });
  }

  if (!reviewed_by) {
    return res.status(400).json({ error: 'reviewed_by is required' });
  }

  try {
    const affected = await LeaveRequest.updateLeaveRequestStatus(req.params.id, status, reviewed_by);
    if (!affected) return res.status(404).json({ error: 'Leave request not found' });
    res.json({ message: 'Leave request status updated' });
  } catch (err) {
    next(err);
  }
};

export const editLeaveRequest = async (req, res, next) => {
  try {
    const affected = await LeaveRequest.updateLeaveRequest(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Leave request not found' });
    res.json({ message: 'Leave request updated' });
  } catch (err) {
    next(err);
  }
};

export const removeLeaveRequest = async (req, res, next) => {
  try {
    const affected = await LeaveRequest.deleteLeaveRequest(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Leave request not found' });
    res.json({ message: 'Leave request deleted' });
  } catch (err) {
    next(err);
  }
};
