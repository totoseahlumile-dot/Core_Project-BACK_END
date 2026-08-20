
// ID validation
export const validateId = (req, res, next) => {
  const id = req.params.id;
  if (!id || isNaN(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
};

// Role validation
export const validateRole = (req, res, next) => {
  const { role_name } = req.body;
  if (!role_name || role_name.trim().length === 0) {
    return res.status(400).json({ error: 'Role name is required' });
  }
  if (role_name.length > 100) {
    return res.status(400).json({ error: 'Role name must be less than 100 characters' });
  }
  next();
};

// Role Permission validation
export const validateRolePermission = (req, res, next) => {
  const { role_id, permission_id } = req.body;
  const roleId = req.params.roleId;
  const permissionId = req.params.permissionId;
  
  const rId = role_id || roleId;
  const pId = permission_id || permissionId;
  
  if (!rId || isNaN(Number(rId)) || Number(rId) <= 0) {
    return res.status(400).json({ error: 'Valid Role ID is required' });
  }
  if (!pId || isNaN(Number(pId)) || Number(pId) <= 0) {
    return res.status(400).json({ error: 'Valid Permission ID is required' });
  }
  next();
};

// Shift validation
export const validateShift = (req, res, next) => {
  const { employee_id, shift_date, start_time, end_time } = req.body;
  
  if (!employee_id || isNaN(Number(employee_id)) || Number(employee_id) <= 0) {
    return res.status(400).json({ error: 'Valid Employee ID is required' });
  }
  if (!shift_date) {
    return res.status(400).json({ error: 'Shift date is required' });
  }
  if (!start_time) {
    return res.status(400).json({ error: 'Start time is required' });
  }
  if (!end_time) {
    return res.status(400).json({ error: 'End time is required' });
  }
  next();
};

// Time Entry validation
export const validateTimeEntry = (req, res, next) => {
  const { employee_id, start_time } = req.body;
  
  if (!employee_id || isNaN(Number(employee_id)) || Number(employee_id) <= 0) {
    return res.status(400).json({ error: 'Valid Employee ID is required' });
  }
  if (!start_time) {
    return res.status(400).json({ error: 'Start time is required' });
  }
  next();
};

// Timesheet validation
export const validateTimesheet = (req, res, next) => {
  const { employee_id, work_date } = req.body;
  
  if (!employee_id || isNaN(Number(employee_id)) || Number(employee_id) <= 0) {
    return res.status(400).json({ error: 'Valid Employee ID is required' });
  }
  if (!work_date) {
    return res.status(400).json({ error: 'Work date is required' });
  }
  next();
};

// User validation
export const validateUser = (req, res, next) => {
  const { user_name, user_email } = req.body;
  
  if (!user_name || user_name.trim().length === 0) {
    return res.status(400).json({ error: 'Username is required' });
  }
  if (!user_email || user_email.trim().length === 0) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  next();
};

// Attendance validation
export const validateAttendance = (req, res, next) => {
  const { employee_id, attendance_date } = req.body;
  
  if (!employee_id || isNaN(Number(employee_id)) || Number(employee_id) <= 0) {
    return res.status(400).json({ error: 'Valid Employee ID is required' });
  }
  if (!attendance_date) {
    return res.status(400).json({ error: 'Attendance date is required' });
  }
  next();
};

// Audit Log validation
export const validateAuditLog = (req, res, next) => {
  const { action_type, table_name } = req.body;
  
  if (!action_type || action_type.trim().length === 0) {
    return res.status(400).json({ error: 'Action type is required' });
  }
  if (!table_name || table_name.trim().length === 0) {
    return res.status(400).json({ error: 'Table name is required' });
  }
  next();
};

// Company Setting validation
export const validateCompanySetting = (req, res, next) => {
  const { setting_key, setting_value } = req.body;
  
  if (!setting_key || setting_key.trim().length === 0) {
    return res.status(400).json({ error: 'Setting key is required' });
  }
  if (!setting_value || setting_value.trim().length === 0) {
    return res.status(400).json({ error: 'Setting value is required' });
  }
  next();
};

// Department validation
export const validateDepartment = (req, res, next) => {
  const { department_name } = req.body;
  
  if (!department_name || department_name.trim().length === 0) {
    return res.status(400).json({ error: 'Department name is required' });
  }
  if (department_name.length > 100) {
    return res.status(400).json({ error: 'Department name must be less than 100 characters' });
  }
  next();
};

// Employee validation
export const validateEmployee = (req, res, next) => {
  const { employee_number, first_name, last_name, email, position_id, salary, hire_date } = req.body;
  
  if (!employee_number || employee_number.trim().length === 0) {
    return res.status(400).json({ error: 'Employee number is required' });
  }
  if (!first_name || first_name.trim().length === 0) {
    return res.status(400).json({ error: 'First name is required' });
  }
  if (!last_name || last_name.trim().length === 0) {
    return res.status(400).json({ error: 'Last name is required' });
  }
  if (!email || email.trim().length === 0) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  if (!position_id || isNaN(Number(position_id)) || Number(position_id) <= 0) {
    return res.status(400).json({ error: 'Valid Position ID is required' });
  }
  if (salary === undefined || salary === null || isNaN(Number(salary)) || Number(salary) < 0) {
    return res.status(400).json({ error: 'Valid salary is required (must be >= 0)' });
  }
  if (!hire_date) {
    return res.status(400).json({ error: 'Hire date is required' });
  }
  next();
};

// Employee Setting validation
export const validateEmployeeSetting = (req, res, next) => {
  const { employee_id, setting_key, setting_value } = req.body;
  
  if (!employee_id || isNaN(Number(employee_id)) || Number(employee_id) <= 0) {
    return res.status(400).json({ error: 'Valid Employee ID is required' });
  }
  if (!setting_key || setting_key.trim().length === 0) {
    return res.status(400).json({ error: 'Setting key is required' });
  }
  if (!setting_value || setting_value.trim().length === 0) {
    return res.status(400).json({ error: 'Setting value is required' });
  }
  next();
};

// Leave Request validation
export const validateLeaveRequest = (req, res, next) => {
  const { employee_id, leave_type_id, start_date, end_date } = req.body;
  
  if (!employee_id || isNaN(Number(employee_id)) || Number(employee_id) <= 0) {
    return res.status(400).json({ error: 'Valid Employee ID is required' });
  }
  if (!leave_type_id || isNaN(Number(leave_type_id)) || Number(leave_type_id) <= 0) {
    return res.status(400).json({ error: 'Valid Leave Type ID is required' });
  }
  if (!start_date) {
    return res.status(400).json({ error: 'Start date is required' });
  }
  if (!end_date) {
    return res.status(400).json({ error: 'End date is required' });
  }
  if (new Date(start_date) > new Date(end_date)) {
    return res.status(400).json({ error: 'Start date cannot be after end date' });
  }
  next();
};

// Leave Type validation
export const validateLeaveType = (req, res, next) => {
  const { leave_type_name } = req.body;
  
  if (!leave_type_name || leave_type_name.trim().length === 0) {
    return res.status(400).json({ error: 'Leave type name is required' });
  }
  if (leave_type_name.length > 50) {
    return res.status(400).json({ error: 'Leave type name must be less than 50 characters' });
  }
  next();
};

// Payroll validation
export const validatePayroll = (req, res, next) => {
  const { employee_id, pay_period_start, pay_period_end, base_salary } = req.body;
  
  if (!employee_id || isNaN(Number(employee_id)) || Number(employee_id) <= 0) {
    return res.status(400).json({ error: 'Valid Employee ID is required' });
  }
  if (!pay_period_start) {
    return res.status(400).json({ error: 'Pay period start date is required' });
  }
  if (!pay_period_end) {
    return res.status(400).json({ error: 'Pay period end date is required' });
  }
  if (base_salary === undefined || base_salary === null || isNaN(Number(base_salary)) || Number(base_salary) < 0) {
    return res.status(400).json({ error: 'Valid base salary is required (must be >= 0)' });
  }
  if (new Date(pay_period_start) > new Date(pay_period_end)) {
    return res.status(400).json({ error: 'Pay period start cannot be after end' });
  }
  next();
};

// Payslip validation
export const validatePayslip = (req, res, next) => {
  const { payroll_id, payslip_number } = req.body;
  
  if (!payroll_id || isNaN(Number(payroll_id)) || Number(payroll_id) <= 0) {
    return res.status(400).json({ error: 'Valid Payroll ID is required' });
  }
  if (!payslip_number || payslip_number.trim().length === 0) {
    return res.status(400).json({ error: 'Payslip number is required' });
  }
  next();
};

// Performance Review validation
export const validatePerformanceReview = (req, res, next) => {
  const { review_cycle_id, employee_id, reviewer_id } = req.body;
  
  if (!review_cycle_id || isNaN(Number(review_cycle_id)) || Number(review_cycle_id) <= 0) {
    return res.status(400).json({ error: 'Valid Review Cycle ID is required' });
  }
  if (!employee_id || isNaN(Number(employee_id)) || Number(employee_id) <= 0) {
    return res.status(400).json({ error: 'Valid Employee ID is required' });
  }
  if (!reviewer_id || isNaN(Number(reviewer_id)) || Number(reviewer_id) <= 0) {
    return res.status(400).json({ error: 'Valid Reviewer ID is required' });
  }
  if (employee_id === reviewer_id) {
    return res.status(400).json({ error: 'Employee cannot review themselves' });
  }
  next();
};

// Review Cycle validation
export const validateReviewCycle = (req, res, next) => {
  const { cycle_name, start_date, end_date } = req.body;
  
  if (!cycle_name || cycle_name.trim().length === 0) {
    return res.status(400).json({ error: 'Cycle name is required' });
  }
  if (!start_date) {
    return res.status(400).json({ error: 'Start date is required' });
  }
  if (!end_date) {
    return res.status(400).json({ error: 'End date is required' });
  }
  if (new Date(start_date) > new Date(end_date)) {
    return res.status(400).json({ error: 'Start date cannot be after end date' });
  }
  next();
};

// Permission validation
export const validatePermission = (req, res, next) => {
  const { permission_name } = req.body;
  
  if (!permission_name || permission_name.trim().length === 0) {
    return res.status(400).json({ error: 'Permission name is required' });
  }
  if (permission_name.length > 100) {
    return res.status(400).json({ error: 'Permission name must be less than 100 characters' });
  }
  next();
};

// Position validation
export const validatePosition = (req, res, next) => {
  const { department_id, position_title } = req.body;
  
  if (!department_id || isNaN(Number(department_id)) || Number(department_id) <= 0) {
    return res.status(400).json({ error: 'Valid Department ID is required' });
  }
  if (!position_title || position_title.trim().length === 0) {
    return res.status(400).json({ error: 'Position title is required' });
  }
  if (position_title.length > 100) {
    return res.status(400).json({ error: 'Position title must be less than 100 characters' });
  }
  next();
};

// Login validation
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email.trim().length === 0) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  next();
};

// Registration validation
export const validateRegister = (req, res, next) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || email.trim().length === 0) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  // Check for strong password (optional)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      error: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character' 
    });
  }

  if (!first_name || first_name.trim().length === 0) {
    return res.status(400).json({ error: 'First name is required' });
  }

  if (!last_name || last_name.trim().length === 0) {
    return res.status(400).json({ error: 'Last name is required' });
  }

  next();
};

// Change Password validation
export const validateChangePassword = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword) {
    return res.status(400).json({ error: 'Current password is required' });
  }

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }

  // Strong password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({ 
      error: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character' 
    });
  }

  if (currentPassword === newPassword) {
    return res.status(400).json({ error: 'New password must be different from current password' });
  }

  next();
};