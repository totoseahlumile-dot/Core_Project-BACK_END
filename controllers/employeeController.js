import * as Employee from '../models/employeeModel.js';
import * as PerformanceReview from '../models/performanceReviewModel.js';
import * as ReviewCycle from '../models/reviewCycleModel.js';

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.getAllEmployees();
    const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
    res.json(isHr ? employees : employees.filter(employee => Number(employee.employee_id) === Number(req.user.employee_id)));
  } catch (err) {
    next(err);
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
    if (!isHr && Number(employee.employee_id) !== Number(req.user.employee_id)) {
      return res.status(403).json({ error: 'You may only view your own employee record' });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

export const addEmployee = async (req, res, next) => {
  const { employee_number, first_name, last_name, email, position_id, salary, hire_date } = req.body;
  if (!employee_number || !first_name || !last_name || !email || !position_id || salary == null || !hire_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (salary < 0) {
    return res.status(400).json({ error: 'Salary cannot be negative' });
  }
  try {
    const id = await Employee.createEmployee(req.body);
    let reviewId = null;
    const cycles = await ReviewCycle.getAllReviewCycles();
    const activeCycle = cycles.find(cycle => cycle.status === 'Active') || cycles[0];
    if (activeCycle && req.user?.employee_id) {
      reviewId = await PerformanceReview.createPerformanceReview({
        review_cycle_id: activeCycle.review_cycle_id,
        employee_id: id,
        reviewer_id: req.user.employee_id,
        status: 'Draft',
        review_date: new Date().toISOString().slice(0, 10),
        comments: 'Automatically generated when employee was added',
      });
    }
    res.status(201).json({ employee_id: id, review_id: reviewId, message: 'Employee created' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Employee number or email already exists' });
    }
    next(err);
  }
};

export const editEmployee = async (req, res, next) => {
  try {
    const affected = await Employee.updateEmployee(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee updated' });
  } catch (err) {
    next(err);
  }
};

export const removeEmployee = async (req, res, next) => {
  try {
    const affected = await Employee.terminateEmployee(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee marked as terminated' });
  } catch (err) {
    next(err);
  }
};
