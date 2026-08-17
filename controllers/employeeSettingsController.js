import * as EmployeeSettings from '../models/employeeSettingsModel.js';

export const getEmployeeSettings = async (req, res, next) => {
  try {
    const settings = await EmployeeSettings.getAllEmployeeSettings();
    res.json(settings);
  } catch (err) {
    next(err);
  }
};

export const getEmployeeSetting = async (req, res, next) => {
  try {
    const setting = await EmployeeSettings.getEmployeeSettingById(req.params.id);
    if (!setting) return res.status(404).json({ error: 'Employee setting not found' });
    res.json(setting);
  } catch (err) {
    next(err);
  }
};

export const addEmployeeSetting = async (req, res, next) => {
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
    const affected = await EmployeeSettings.updateEmployeeSetting(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Employee setting not found' });
    res.json({ message: 'Employee setting updated' });
  } catch (err) {
    next(err);
  }
};

export const removeEmployeeSetting = async (req, res, next) => {
  try {
    const affected = await EmployeeSettings.deleteEmployeeSetting(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Employee setting not found' });
    res.json({ message: 'Employee setting deleted' });
  } catch (err) {
    next(err);
  }
};
