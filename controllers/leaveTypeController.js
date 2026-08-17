import * as LeaveType from '../models/leaveTypeModel.js';

export const getLeaveTypes = async (req, res, next) => {
  try {
    const types = await LeaveType.getAllLeaveTypes();
    res.json(types);
  } catch (err) {
    next(err);
  }
};

export const getLeaveType = async (req, res, next) => {
  try {
    const item = await LeaveType.getLeaveTypeById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Leave type not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const addLeaveType = async (req, res, next) => {
  const { leave_type_name } = req.body;
  if (!leave_type_name) {
    return res.status(400).json({ error: 'Leave type name is required' });
  }

  try {
    const id = await LeaveType.createLeaveType(req.body);
    res.status(201).json({ leave_type_id: id, message: 'Leave type created' });
  } catch (err) {
    next(err);
  }
};

export const editLeaveType = async (req, res, next) => {
  try {
    const affected = await LeaveType.updateLeaveType(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Leave type not found' });
    res.json({ message: 'Leave type updated' });
  } catch (err) {
    next(err);
  }
};

export const removeLeaveType = async (req, res, next) => {
  try {
    const affected = await LeaveType.deleteLeaveType(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Leave type not found' });
    res.json({ message: 'Leave type deleted' });
  } catch (err) {
    next(err);
  }
};
