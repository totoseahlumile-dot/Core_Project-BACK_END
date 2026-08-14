import * as Department from '../models/departmentModel.js';

export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.getAllDepartments();
    res.json(departments);
  } catch (err) {
    next(err);
  }
};

export const getDepartment = async (req, res, next) => {
  try {
    const department = await Department.getDepartmentById(req.params.id);
    if (!department) return res.status(404).json({ error: 'Department not found' });
    res.json(department);
  } catch (err) {
    next(err);
  }
};

export const addDepartment = async (req, res, next) => {
  const { department_name, description } = req.body;

  if (!department_name) {
    return res.status(400).json({ error: 'Department name is required' });
  }

  try {
    const id = await Department.createDepartment({ department_name, description });
    res.status(201).json({ department_id: id, message: 'Department created' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Department already exists' });
    }
    next(err);
  }
};

export const editDepartment = async (req, res, next) => {
  try {
    const affected = await Department.updateDepartment(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Department not found' });
    res.json({ message: 'Department updated' });
  } catch (err) {
    next(err);
  }
};

export const removeDepartment = async (req, res, next) => {
  try {
    const affected = await Department.deleteDepartment(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Department not found' });
    res.json({ message: 'Department deleted' });
  } catch (err) {
    next(err);
  }
};
