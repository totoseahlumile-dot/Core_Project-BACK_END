import * as EmployeeSettings from '../models/employeeSettingsModel.js';

export const getEmployeeSettings = async (req, res, next) => {
  try {
    const settings = await EmployeeSettings.getAllEmployeeSettings();
    const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
    res.json(isHr ? settings : settings.filter(setting => Number(setting.employee_id) === Number(req.user.employee_id)));
  } catch (err) {
    next(err);
  }
};

export const getEmployeeSetting = async (req, res, next) => {
  try {
    const setting = await EmployeeSettings.getEmployeeSettingById(req.params.id);
    if (!setting) return res.status(404).json({ error: 'Employee setting not found' });
    const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
    if (!isHr && Number(setting.employee_id) !== Number(req.user.employee_id)) {
      return res.status(403).json({ error: 'You may only view your own settings' });
    }
    res.json(setting);
  } catch (err) {
    next(err);
  }
};

export const addEmployeeSetting = async (req, res, next) => {
  req.body ||= {};
  const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
  if (!isHr) req.body.employee_id = req.user.employee_id;
  const { employee_id, setting_key, setting_value } = req.body;
  if (!employee_id || !setting_key || !setting_value) {
    return res.status(400).json({ error: 'Employee ID, setting key, and value are required' });
  }

  try {
    const id = await EmployeeSettings.createEmployeeSetting(req.body);
    res.status(201).json({ employee_setting_id: id, message: 'Employee setting created' });
  } catch (err) {
    next(err);
  }
};

export const editEmployeeSetting = async (req, res, next) => {
  try {
    req.body ||= {};
    const current = await EmployeeSettings.getEmployeeSettingById(req.params.id);
    if (!current) return res.status(404).json({ error: 'Employee setting not found' });
    const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
    if (!isHr && Number(current.employee_id) !== Number(req.user.employee_id)) {
      return res.status(403).json({ error: 'You may only change your own settings' });
    }
    if (!isHr) req.body.employee_id = req.user.employee_id;
    const affected = await EmployeeSettings.updateEmployeeSetting(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Employee setting not found' });
    res.json({ message: 'Employee setting updated' });
  } catch (err) {
    next(err);
  }
};

export const removeEmployeeSetting = async (req, res, next) => {
  try {
    const current = await EmployeeSettings.getEmployeeSettingById(req.params.id);
    if (!current) return res.status(404).json({ error: 'Employee setting not found' });
    const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
    if (!isHr && Number(current.employee_id) !== Number(req.user.employee_id)) {
      return res.status(403).json({ error: 'You may only delete your own settings' });
    }
    const affected = await EmployeeSettings.deleteEmployeeSetting(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Employee setting not found' });
    res.json({ message: 'Employee setting deleted' });
  } catch (err) {
    next(err);
  }
};
