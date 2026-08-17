import * as LeaveRequest from '../models/leaveRequestModel.js';

export const getLeaveRequests = async (req, res, next) => {
  try {
    const records = await LeaveRequest.getAllLeaveRequests();
    res.json(records);
  } catch (err) {
    next(err);
  }
};

export const getLeaveRequest = async (req, res, next) => {
  try {
    const record = await LeaveRequest.getLeaveRequestById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Leave request not found' });
    res.json(record);
  } catch (err) {
    next(err);
  }
};

export const addLeaveRequest = async (req, res, next) => {
  const { employee_id, leave_type_id, start_date, end_date } = req.body;

  if (!employee_id || !leave_type_id || !start_date || !end_date) {
    return res.status(400).json({ error: 'Employee ID, leave type, start date, and end date are required' });
  }

  try {
    const id = await LeaveRequest.createLeaveRequest(req.body);
    res.status(201).json({ leave_request_id: id, message: 'Leave request created' });
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
