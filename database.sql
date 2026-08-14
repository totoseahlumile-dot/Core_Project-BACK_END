CREATE DATABASE IF NOT EXISTS moderntech_hr
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE moderntech_hr;
SET FOREIGN_KEY_CHECKS = 0;
DROP VIEW IF EXISTS vw_employee_directory;
DROP VIEW IF EXISTS vw_payroll_summary;
DROP VIEW IF EXISTS vw_attendance_summary;
DROP TRIGGER IF EXISTS trg_employees_updated_at;
DROP TRIGGER IF EXISTS trg_attendance_updated_at;
DROP TRIGGER IF EXISTS trg_leave_updated_at;
DROP TRIGGER IF EXISTS trg_leave_status_audit;
DROP TRIGGER IF EXISTS trg_payroll_updated_at;
DROP TRIGGER IF EXISTS trg_performance_updated_at;
DROP TRIGGER IF EXISTS trg_time_entries_updated_at;
DROP TRIGGER IF EXISTS trg_timesheets_updated_at;
DROP TRIGGER IF EXISTS trg_shifts_updated_at;
DROP TRIGGER IF EXISTS trg_users_updated_at;
DROP PROCEDURE IF EXISTS sp_get_employee_dashboard;
DROP PROCEDURE IF EXISTS sp_submit_leave_request;
DROP PROCEDURE IF EXISTS sp_approve_leave_request;
DROP PROCEDURE IF EXISTS sp_get_payroll_summary;
DROP TABLE IF EXISTS audit_log;
DROP TABLE IF EXISTS employee_settings;
DROP TABLE IF EXISTS company_settings;
DROP TABLE IF EXISTS payslips;
DROP TABLE IF EXISTS payroll;
DROP TABLE IF EXISTS performance_reviews;
DROP TABLE IF EXISTS review_cycles;
DROP TABLE IF EXISTS time_entries;
DROP TABLE IF EXISTS timesheets;
DROP TABLE IF EXISTS shifts;
DROP TABLE IF EXISTS leave_requests;
DROP TABLE IF EXISTS leave_types;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS role_permissions;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employment_history;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS positions;
DROP TABLE IF EXISTS departments;
SET FOREIGN_KEY_CHECKS = 1;


-- DEPARTMENTS
CREATE TABLE departments (
department_id INT AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(100) NOT NULL UNIQUE,
description VARCHAR(255),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


INSERT INTO departments (department_name, description) VALUES 
('Development', 'Software development and engineering'), 
('HR', 'Human resources and employee management'), 
('QA', 'Quality assurance and testing'), 
('Sales', 'Sales and customer acquisition'), 
('Marketing', 'Marketing and communications'),
('Design', 'UI/UX and product design'), 
('IT', 'Information technology and infrastructure'), 
('Finance', 'Finance and accounting'), 
('Support', 'Customer and technical support'); 

SELECT *
FROM moderntech_hr.departments
WHERE department_name = 'HR';

-- POSITIONS
-- position belongs to one department.
CREATE TABLE positions (
position_id INT AUTO_INCREMENT PRIMARY KEY,
department_id INT NOT NULL,
position_title VARCHAR(100) NOT NULL,
description VARCHAR(255),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT uq_position_department UNIQUE (department_id,
position_title),
CONSTRAINT fk_positions_department
FOREIGN KEY (department_id) REFERENCES departments(department_id)
ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
CREATE INDEX idx_positions_department ON positions(department_id);


INSERT INTO positions (department_id, position_title, description) VALUES 
((SELECT department_id FROM departments WHERE department_name = 
'Development'), 'Software Engineer', 'Develops and maintains software'), 
((SELECT department_id FROM departments WHERE department_name = 'HR'), 'HR 
Manager', 'Manages HR operations'), 
((SELECT department_id FROM departments WHERE department_name = 'QA'), 
'Quality Analyst', 'Tests software and processes'), 
((SELECT department_id FROM departments WHERE department_name = 'Sales'), 
'Sales Representative', 'Handles sales activities'), 
((SELECT department_id FROM departments WHERE department_name = 
'Marketing'), 'Marketing Specialist', 'Manages marketing activities'), 
((SELECT department_id FROM departments WHERE department_name = 'Design'), 
'UI/UX Designer', 'Designs user interfaces and experiences'), 
((SELECT department_id FROM departments WHERE department_name = 'IT'), 
'DevOps Engineer', 'Manages infrastructure and deployments'), 
((SELECT department_id FROM departments WHERE department_name = 
'Marketing'), 'Content Strategist', 'Plans content strategy'), 
((SELECT department_id FROM departments WHERE department_name = 
'Finance'), 'Accountant', 'Manages financial records'), 
((SELECT department_id FROM departments WHERE department_name = 
'Support'), 'Customer Support Lead', 'Leads customer support'); 

INSERT INTO moderntech_hr.positions
    (department_id, position_title, description)
SELECT
    department_id,
    'HR Manager',
    'Manages HR operations'
FROM moderntech_hr.departments
WHERE department_name = 'HR';

SELECT
    p.position_id,
    p.position_title,
    d.department_name
FROM moderntech_hr.positions p
JOIN moderntech_hr.departments d
    ON p.department_id = d.department_id
WHERE p.position_title = 'HR Manager';

-- EMPLOYEES
-- Department is derived from position -> department
CREATE TABLE employees (
employee_id INT AUTO_INCREMENT PRIMARY KEY,
employee_number VARCHAR(20) NOT NULL UNIQUE,
first_name VARCHAR(60) NOT NULL,
last_name VARCHAR(60) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
phone VARCHAR(30),
position_id INT NOT NULL,
salary DECIMAL(12,2) NOT NULL DEFAULT 0.00,
employment_status ENUM('Active','Inactive','On Leave','Terminated')
NOT NULL DEFAULT 'Active',
hire_date DATE NOT NULL,
termination_date DATE NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE
CURRENT_TIMESTAMP,
CONSTRAINT chk_employee_salary CHECK (salary >= 0),
CONSTRAINT chk_employee_dates CHECK (termination_date IS NULL OR
termination_date >= hire_date),
CONSTRAINT fk_employees_position
FOREIGN KEY (position_id) REFERENCES positions(position_id)
ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
CREATE INDEX idx_employees_position ON employees(position_id);
CREATE INDEX idx_employees_status ON employees(employment_status);
CREATE INDEX idx_employees_name ON employees(last_name, first_name);

-- Employees based on the existing frontend Employee_info.json. 
INSERT INTO employees 
(employee_number, first_name, last_name, email, phone, position_id, 
salary, employment_status, hire_date) 
VALUES 
('EMP001','Sibongile','Nkosi','sibongile.nkosi@moderntech.com',NULL, (SELECT position_id FROM positions WHERE position_title='Software Engineer'),70000,'Active','2015-01-01'), 
('EMP002','Lungile','Moyo','lungile.moyo@moderntech.com',NULL,(SELECT position_id FROM positions WHERE position_title='HR Manager'),80000,'Active','2013-01-01'), 
('EMP003','Thabo','Molefe','thabo.molefe@moderntech.com',NULL, (SELECT position_id FROM positions WHERE position_title='Quality Analyst'),55000,'Active','2018-01-01'), 
('EMP004','Keshav','Naidoo','keshav.naidoo@moderntech.com',NULL, (SELECT position_id FROM positions WHERE position_title='Sales Representative'),60000,'Active','2020-01-01'), 
('EMP005','Zanele','Khumalo','zanele.khumalo@moderntech.com',NULL, (SELECT position_id FROM positions WHERE position_title='Marketing Specialist'),58000,'Active','2019-01-01'), 
('EMP006','Sipho','Zulu','sipho.zulu@moderntech.com',NULL, (SELECT position_id FROM positions WHERE position_title='UI/UX Designer'),65000,'Active','2016-01-01'), 
('EMP007','Naledi','Moeketsi','naledi.moeketsi@moderntech.com',NULL, (SELECT position_id FROM positions WHERE position_title='DevOps Engineer'),72000,'Active','2017-01-01'), 
('EMP008','Farai','Gumbo','farai.gumbo@moderntech.com',NULL, (SELECT position_id FROM positions WHERE position_title='Content Strategist'),56000,'Active','2021-01-01'), 
('EMP009','Karabo','Dlamini','karabo.dlamini@moderntech.com',NULL, (SELECT position_id FROM positions WHERE position_title='Accountant'),62000,'Active','2018-01-01'), 
('EMP010','Fatima','Patel','fatima.patel@moderntech.com',NULL, (SELECT position_id FROM positions WHERE position_title='Customer Support Lead'),58000,'Active','2016-01-01'); 


-- ROLES
CREATE TABLE roles (
role_id INT AUTO_INCREMENT PRIMARY KEY,
role_name VARCHAR(50) NOT NULL UNIQUE,
description VARCHAR(255)
) ENGINE=InnoDB;

INSERT INTO roles (role_name, description) VALUES 
('Admin', 'Full HR system administration'), 
('HR Manager', 'HR and employee management access'), 
('Employee', 'Standard employee access'), 
('Manager', 'Manager and team review access'); 

-- PERMISSIONS
CREATE TABLE permissions (
permission_id INT AUTO_INCREMENT PRIMARY KEY,
permission_name VARCHAR(100) NOT NULL UNIQUE,
description VARCHAR(255)
) ENGINE=InnoDB;

INSERT INTO permissions (permission_name, description) VALUES 
('employees.read', 'View employees'), 
('employees.write', 'Create and update employees'), 
('attendance.read', 'View attendance'), 
('attendance.write', 'Create and update attendance'), 
('leave.read', 'View leave requests'), 
('leave.write', 'Submit and update leave requests'), 
('leave.approve', 'Approve or deny leave requests'), 
('payroll.read', 'View payroll'), 
('payroll.write', 'Create and process payroll'), 
('reviews.read', 'View performance reviews'), 
('reviews.write', 'Create and update performance reviews'), 
('settings.manage', 'Manage system settings');

-- ROLE/PERMISSION JUNCTION
-- Many-to-many relationship.
CREATE TABLE role_permissions (
role_id INT NOT NULL,
permission_id INT NOT NULL,
PRIMARY KEY (role_id, permission_id),
CONSTRAINT fk_role_permissions_role
FOREIGN KEY (role_id) REFERENCES roles(role_id)
ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_role_permissions_permission
FOREIGN KEY (permission_id) REFERENCES permissions(permission_id)
ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Admin gets every permission. 
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.role_id, p.permission_id 
FROM roles r CROSS JOIN permissions p 
WHERE r.role_name = 'Admin'; 

-- HR Manager permissions. 
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.role_id, p.permission_id 
FROM roles r JOIN permissions p 
WHERE r.role_name = 'HR Manager' 
AND p.permission_name IN ( 
'employees.read','employees.write','attendance.read','attendance.write', 
'leave.read','leave.write','leave.approve','payroll.read', 
'reviews.read','reviews.write','settings.manage' 
); 

-- Manager permissions. 
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.role_id, p.permission_id 
FROM roles r JOIN permissions p 
WHERE r.role_name = 'Manager' 
AND p.permission_name IN ( 
'employees.read','attendance.read','attendance.write', 
'leave.read','leave.approve','reviews.read','reviews.write' 
); 

-- Employee permissions. 
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.role_id, p.permission_id 
FROM roles r JOIN permissions p 
WHERE r.role_name = 'Employee' 
AND p.permission_name IN ( 
'employees.read','attendance.read','leave.read','leave.write', 
'payroll.read','reviews.read','reviews.write' 
); 


-- EMPLOYMENT HISTORY
-- Replaces the old JSON "employmentHistory" string.
CREATE TABLE employment_history (
history_id INT AUTO_INCREMENT PRIMARY KEY,
employee_id INT NOT NULL,
position_id INT NOT NULL,
start_date DATE NOT NULL,
end_date DATE NULL,
notes VARCHAR(500),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT chk_history_dates CHECK (end_date IS NULL OR end_date >=
start_date),
CONSTRAINT fk_history_employee
FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_history_position
FOREIGN KEY (position_id) REFERENCES positions(position_id)
ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
CREATE INDEX idx_history_employee_dates ON employment_history(employee_id,
start_date, end_date);

INSERT INTO employment_history (employee_id, position_id, start_date, 
end_date, notes) 
SELECT employee_id, position_id, hire_date, NULL, 'Initial employment 
record' 
FROM employees;


-- EMPLOYMENT HISTORY
-- Replaces the old JSON "employmentHistory" string.
CREATE TABLE employment_history (
history_id INT AUTO_INCREMENT PRIMARY KEY,
employee_id INT NOT NULL,
position_id INT NOT NULL,
start_date DATE NOT NULL,
end_date DATE NULL,
notes VARCHAR(500),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT chk_history_dates CHECK (end_date IS NULL OR end_date >=
start_date),
CONSTRAINT fk_history_employee
FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_history_position
FOREIGN KEY (position_id) REFERENCES positions(position_id)
ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
CREATE INDEX idx_history_employee_dates ON employment_history(employee_id,
start_date, end_date);

INSERT INTO employment_history (employee_id, position_id, start_date, 
end_date, notes) 
SELECT employee_id, position_id, hire_date, NULL, 'Initial employment 
record' 
FROM employees;


-- ATTENDANCE
-- One attendance record per employee per date.
CREATE TABLE attendance (
attendance_id INT AUTO_INCREMENT PRIMARY KEY,
employee_id INT NOT NULL,
attendance_date DATE NOT NULL,
check_in DATETIME NULL,
check_out DATETIME NULL,
status ENUM('Present','Absent','Late','Half Day','Remote','On Leave')
NOT NULL,
notes VARCHAR(255),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE
CURRENT_TIMESTAMP,
CONSTRAINT uq_attendance_employee_date UNIQUE (employee_id,
attendance_date),
CONSTRAINT chk_attendance_times CHECK (check_out IS NULL OR check_in
IS NULL OR check_out >= check_in),
CONSTRAINT fk_attendance_employee
FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE INDEX idx_attendance_date_status ON attendance(attendance_date,
status);
CREATE INDEX idx_attendance_employee_date ON attendance(employee_id,
attendance_date);


-- Attendance based on the supplied frontend data. 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-25', 'Present' FROM employees WHERE 
employee_number='EMP001'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-26', 'Absent' FROM employees WHERE 
employee_number='EMP001'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-27', 'Present' FROM employees WHERE 
employee_number='EMP001'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-28', 'Present' FROM employees WHERE 
employee_number='EMP001'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-29', 'Present' FROM employees WHERE 
employee_number='EMP001'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-25', 'Present' FROM employees WHERE 
employee_number='EMP002'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-26', 'Present' FROM employees WHERE 
employee_number='EMP002'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-27', 'Absent' FROM employees WHERE 
employee_number='EMP002'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-28', 'Present' FROM employees WHERE 
employee_number='EMP002'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-29', 'Present' FROM employees WHERE 
employee_number='EMP002';
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-25', 'Present' FROM employees WHERE 
employee_number='EMP003'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-26', 'Present' FROM employees WHERE 
employee_number='EMP003'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-27', 'Present' FROM employees WHERE 
employee_number='EMP003'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-28', 'Absent' FROM employees WHERE 
employee_number='EMP003'; 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT employee_id, '2025-07-29', 'Present' FROM employees WHERE 
employee_number='EMP003'; 

-- Give the remaining employees sample attendance for the same five days. 
INSERT INTO attendance (employee_id, attendance_date, status) 
SELECT e.employee_id, d.attendance_date, 
CASE WHEN MOD(e.employee_id + DAY(d.attendance_date), 7) = 0 THEN 
'Absent' ELSE 'Present' END 
FROM employees e 
CROSS JOIN ( 
SELECT '2025-07-25' AS attendance_date 
UNION ALL SELECT '2025-07-26' 
UNION ALL SELECT '2025-07-27' 
UNION ALL SELECT '2025-07-28' 
UNION ALL SELECT '2025-07-29' 
) d 
WHERE e.employee_id >= 4; 


SELECT
    e.employee_number,
    e.first_name,
    e.last_name,
    COUNT(a.attendance_id) AS attendance_records
FROM employees e
LEFT JOIN attendance a
    ON e.employee_id = a.employee_id
GROUP BY
    e.employee_id,
    e.employee_number,
    e.first_name,
    e.last_name
ORDER BY e.employee_id;




INSERT IGNORE INTO attendance
    (employee_id, attendance_date, status)
SELECT
    e.employee_id,
    d.attendance_date,
    CASE
        WHEN MOD(e.employee_id + DAY(d.attendance_date), 7) = 0
        THEN 'Absent'
        ELSE 'Present'
    END
FROM employees e
CROSS JOIN (
    SELECT '2025-07-25' AS attendance_date
    UNION ALL SELECT '2025-07-26'
    UNION ALL SELECT '2025-07-27'
    UNION ALL SELECT '2025-07-28'
    UNION ALL SELECT '2025-07-29'
) d
WHERE e.employee_number NOT IN ('EMP001', 'EMP002', 'EMP003');

SELECT
    e.employee_number,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    COUNT(a.attendance_id) AS attendance_records
FROM employees e
LEFT JOIN attendance a
    ON e.employee_id = a.employee_id
GROUP BY e.employee_id, e.employee_number, e.first_name, e.last_name
ORDER BY e.employee_id;

-- LEAVE TYPES
CREATE TABLE leave_types (
leave_type_id INT AUTO_INCREMENT PRIMARY KEY,
leave_type_name VARCHAR(80) NOT NULL UNIQUE,
description VARCHAR(255),
paid BOOLEAN NOT NULL DEFAULT TRUE,
default_days_per_year DECIMAL(5,2) NOT NULL DEFAULT 0,
CONSTRAINT chk_leave_days CHECK (default_days_per_year >= 0)
) ENGINE=InnoDB;
SELECT * FROM moderntech_hr.leave_types;

INSERT INTO leave_types (leave_type_name, description, paid, 
default_days_per_year) VALUES 
('Annual Leave', 'Annual vacation leave', TRUE, 15), 
('Sick Leave', 'Leave due to illness', TRUE, 30), 
('Family Responsibility', 'Family responsibility leave', TRUE, 3), 
('Personal Leave', 'Personal time off', FALSE, 5), 
('Unpaid Leave', 'Unpaid time away from work', FALSE, 30);

-- LEAVE / TIME-OFF REQUESTS
CREATE TABLE leave_requests (
leave_request_id INT AUTO_INCREMENT PRIMARY KEY,
employee_id INT NOT NULL,
leave_type_id INT NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
reason VARCHAR(500),
status ENUM('Pending','Approved','Denied','Cancelled') NOT NULL 
DEFAULT 'Pending', 
reviewed_by INT NULL, 
reviewed_at DATETIME NULL, 
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE 
CURRENT_TIMESTAMP, 
CONSTRAINT chk_leave_request_dates CHECK (end_date >= start_date), 
CONSTRAINT fk_leave_employee 
FOREIGN KEY (employee_id) REFERENCES employees(employee_id) 
ON UPDATE CASCADE ON DELETE CASCADE, 
CONSTRAINT fk_leave_type 
FOREIGN KEY (leave_type_id) REFERENCES leave_types(leave_type_id) 
ON UPDATE CASCADE ON DELETE RESTRICT, 
CONSTRAINT fk_leave_reviewer 
FOREIGN KEY (reviewed_by) REFERENCES users(user_id) 
ON UPDATE CASCADE ON DELETE SET NULL 
) ENGINE=InnoDB; 
CREATE INDEX idx_leave_employee_status ON leave_requests(employee_id, 
status); 
CREATE INDEX idx_leave_dates ON leave_requests(start_date, end_date); 
CREATE INDEX idx_leave_status ON leave_requests(status); 


-- TIMESHEETS 
-- Weekly/daily hours logged by employees. 
CREATE TABLE timesheets ( 
timesheet_id INT AUTO_INCREMENT PRIMARY KEY, 
employee_id INT NOT NULL, 
work_date DATE NOT NULL, 
hours_worked DECIMAL(5,2) NOT NULL DEFAULT 0, 
overtime_hours DECIMAL(5,2) NOT NULL DEFAULT 0, 
description VARCHAR(500), 
status ENUM('Draft','Submitted','Approved','Rejected') NOT NULL 
DEFAULT 'Draft', 
approved_by INT NULL, 
approved_at DATETIME NULL, 
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE 
CURRENT_TIMESTAMP, 
CONSTRAINT uq_timesheet_employee_date UNIQUE (employee_id, work_date), 
CONSTRAINT chk_timesheet_hours CHECK (hours_worked >= 0 AND 
hours_worked <= 24), 
CONSTRAINT chk_timesheet_overtime CHECK (overtime_hours >= 0 AND 
overtime_hours <= 24), 
CONSTRAINT fk_timesheet_employee 
FOREIGN KEY (employee_id) REFERENCES employees(employee_id) 
ON UPDATE CASCADE ON DELETE CASCADE, 
CONSTRAINT fk_timesheet_approver 
FOREIGN KEY (approved_by) REFERENCES users(user_id) 
ON UPDATE CASCADE ON DELETE SET NULL 
) ENGINE=InnoDB; 
CREATE INDEX idx_timesheet_employee_date ON timesheets(employee_id, 
work_date); 
CREATE INDEX idx_timesheet_status ON timesheets(status);


-- Timesheet sample data. 
INSERT INTO timesheets (employee_id, work_date, hours_worked, 
overtime_hours, description, status) 
SELECT employee_id, '2025-07-25', 8, 0, 'Normal working day', 'Approved' 
FROM employees WHERE employee_number IN ('EMP001','EMP002','EMP003'); 
INSERT INTO timesheets (employee_id, work_date, hours_worked, 
overtime_hours, description, status) 
SELECT employee_id, '2025-07-26', 8, 0, 'Normal working day', 'Approved' 
FROM employees WHERE employee_number IN ('EMP001','EMP002','EMP003'); 


-- LIVE TIME TRACKER 
-- Allows multiple task/project timers. 
CREATE TABLE time_entries ( 
time_entry_id INT AUTO_INCREMENT PRIMARY KEY, 
employee_id INT NOT NULL, 
project_name VARCHAR(150) NOT NULL, 
task_name VARCHAR(150) NOT NULL, 
start_time DATETIME NOT NULL, 
end_time DATETIME NULL, 
duration_minutes INT NULL, 
status ENUM('Running','Completed','Cancelled') NOT NULL DEFAULT 
'Running', 
notes VARCHAR(500), 
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE 
CURRENT_TIMESTAMP, 
CONSTRAINT chk_time_entry_duration CHECK (duration_minutes IS NULL OR 
duration_minutes >= 0), 
CONSTRAINT chk_time_entry_times CHECK (end_time IS NULL OR end_time >= 
start_time), 
CONSTRAINT fk_time_entry_employee 
FOREIGN KEY (employee_id) REFERENCES employees(employee_id) 
ON UPDATE CASCADE ON DELETE CASCADE 
) ENGINE=InnoDB; 
CREATE INDEX idx_time_entries_employee_status ON time_entries(employee_id, 
status); 
CREATE INDEX idx_time_entries_project ON time_entries(project_name); 


-- EMPLOYEE SHIFTS / SCHEDULING 
CREATE TABLE shifts ( 
shift_id INT AUTO_INCREMENT PRIMARY KEY, 
employee_id INT NOT NULL, 
shift_date DATE NOT NULL, 
start_time TIME NOT NULL, 
end_time TIME NOT NULL, 
location VARCHAR(150), 
status ENUM('Scheduled','Completed','Cancelled') NOT NULL DEFAULT 
'Scheduled', 
notes VARCHAR(255), 
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE 
CURRENT_TIMESTAMP, 
CONSTRAINT chk_shift_times CHECK (end_time > start_time), 
CONSTRAINT fk_shift_employee 
FOREIGN KEY (employee_id) REFERENCES employees(employee_id) 
ON UPDATE CASCADE ON DELETE CASCADE 
) ENGINE=InnoDB; 
CREATE INDEX idx_shifts_employee_date ON shifts(employee_id, shift_date); 
CREATE INDEX idx_shifts_date_status ON shifts(shift_date, status); 

-- Shift sample data. 
INSERT INTO shifts (employee_id, shift_date, start_time, end_time, 
location) 
SELECT employee_id, '2025-07-30', '08:00:00', '17:00:00', 'Main Office' 
FROM employees WHERE employee_number IN ('EMP001','EMP002','EMP003'); 


-- PERFORMANCE REVIEW CYCLES 
CREATE TABLE review_cycles ( 
review_cycle_id INT AUTO_INCREMENT PRIMARY KEY, 
cycle_name VARCHAR(150) NOT NULL UNIQUE, 
cycle_type ENUM('Quarterly','Annual','Probation','Custom') NOT NULL 
DEFAULT 'Quarterly', 
start_date DATE NOT NULL, 
end_date DATE NOT NULL, 
status ENUM('Draft','Active','Closed') NOT NULL DEFAULT 'Draft', 
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
CONSTRAINT chk_review_cycle_dates CHECK (end_date >= start_date) 
) ENGINE=InnoDB; 
CREATE INDEX idx_review_cycles_status_dates ON review_cycles(status, 
start_date, end_date);


-- Review cycle and sample reviews. 
INSERT INTO review_cycles (cycle_name, cycle_type, start_date, end_date, 
status) 
VALUES ('2025 Annual Performance Review', 'Annual', '2025-01-01', 
'2025-12-31', 'Active');


-- PERFORMANCE REVIEWS 
CREATE TABLE performance_reviews ( 
review_id INT AUTO_INCREMENT PRIMARY KEY, 
review_cycle_id INT NOT NULL, 
employee_id INT NOT NULL, 
reviewer_id INT NOT NULL, 
rating DECIMAL(3,2) NULL, 
strengths TEXT, 
areas_for_improvement TEXT, 
comments TEXT, 
status ENUM('Draft','Submitted','Completed') NOT NULL DEFAULT 'Draft', 
review_date DATE NULL, 
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE 
CURRENT_TIMESTAMP, 
CONSTRAINT uq_review_cycle_employee UNIQUE (review_cycle_id, 
employee_id), 
CONSTRAINT chk_review_rating CHECK (rating IS NULL OR (rating >= 1 AND 
rating <= 5)), 
CONSTRAINT fk_review_cycle 
FOREIGN KEY (review_cycle_id) REFERENCES 
review_cycles(review_cycle_id) 
ON UPDATE CASCADE ON DELETE CASCADE, 
CONSTRAINT fk_review_employee 
FOREIGN KEY (employee_id) REFERENCES employees(employee_id) 
ON UPDATE CASCADE ON DELETE CASCADE, 
CONSTRAINT fk_review_reviewer 
FOREIGN KEY (reviewer_id) REFERENCES employees(employee_id) 
ON UPDATE CASCADE ON DELETE RESTRICT 
) ENGINE=InnoDB; 
CREATE INDEX idx_reviews_employee ON performance_reviews(employee_id); 
CREATE INDEX idx_reviews_reviewer ON performance_reviews(reviewer_id); 
CREATE INDEX idx_reviews_status ON performance_reviews(status);


INSERT INTO performance_reviews 
(review_cycle_id, employee_id, reviewer_id, rating, strengths, 
areas_for_improvement, comments, status, review_date) 
SELECT rc.review_cycle_id, e.employee_id, m.employee_id, 4.50, 
'Strong technical performance and teamwork.', 
'Continue developing leadership skills.', 
'Good overall performance.', 
'Completed', '2025-07-30' 
FROM review_cycles rc 
JOIN employees e ON e.employee_number='EMP001' 
JOIN employees m ON m.employee_number='EMP002' 
WHERE rc.cycle_name='2025 Annual Performance Review'; -- Payroll sample records based on payroll_data.json. 


-- PAYROLL 
-- One payroll record per employee per pay period. 
CREATE TABLE payroll ( 
payroll_id INT AUTO_INCREMENT PRIMARY KEY, 
employee_id INT NOT NULL, 
pay_period_start DATE NOT NULL, 
pay_period_end DATE NOT NULL, 
base_salary DECIMAL(12,2) NOT NULL, 
hours_worked DECIMAL(8,2) NOT NULL DEFAULT 0, 
overtime_hours DECIMAL(8,2) NOT NULL DEFAULT 0, 
overtime_pay DECIMAL(12,2) NOT NULL DEFAULT 0, 
leave_deductions DECIMAL(12,2) NOT NULL DEFAULT 0,
other_deductions DECIMAL(12,2) NOT NULL DEFAULT 0, 
gross_pay DECIMAL(12,2) NOT NULL DEFAULT 0, 
net_pay DECIMAL(12,2) NOT NULL DEFAULT 0, 
payment_status ENUM('Pending','Processed','Paid','Cancelled') NOT NULL 
DEFAULT 'Pending', 
processed_at DATETIME NULL, 
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE 
CURRENT_TIMESTAMP, 
CONSTRAINT uq_payroll_employee_period UNIQUE (employee_id, 
pay_period_start, pay_period_end), 
CONSTRAINT chk_payroll_dates CHECK (pay_period_end >= 
pay_period_start), 
CONSTRAINT chk_payroll_amounts CHECK ( 
base_salary >= 0 AND overtime_pay >= 0 AND leave_deductions >= 0 
AND other_deductions >= 0 AND gross_pay >= 0 AND net_pay >= 0 
), 
CONSTRAINT fk_payroll_employee 
FOREIGN KEY (employee_id) REFERENCES employees(employee_id) 
ON UPDATE CASCADE ON DELETE CASCADE 
) ENGINE=InnoDB; 
CREATE INDEX idx_payroll_employee_period ON payroll(employee_id, 
pay_period_start, pay_period_end); 
CREATE INDEX idx_payroll_status ON payroll(payment_status); 


INSERT INTO payroll 
(employee_id, pay_period_start, pay_period_end, base_salary, hours_worked, 
overtime_hours, overtime_pay, leave_deductions, other_deductions, 
gross_pay, net_pay, payment_status) 
VALUES 
((SELECT employee_id FROM employees WHERE 
employee_number='EMP001'),'2025-07-01','2025-07-31',70000,160,0,0,500,0,70000,69500,'Paid'), 
((SELECT employee_id FROM employees WHERE 
employee_number='EMP002'),'2025-07-01','2025-07-31',80000,150,0,0,1000,0,80000,79000,'Paid'), 
((SELECT employee_id FROM employees WHERE 
employee_number='EMP003'),'2025-07-01','2025-07-31',55000,170,0,0,200,0,55000,54800,'Paid'), 
((SELECT employee_id FROM employees WHERE 
employee_number='EMP004'),'2025-07-01','2025-07-31',60000,165,0,0,300,0,60000,59700,'Paid'), 
((SELECT employee_id FROM employees WHERE 
employee_number='EMP005'),'2025-07-01','2025-07-31',58000,158,0,0,150,0,58000,57850,'Paid'), 
((SELECT employee_id FROM employees WHERE 
employee_number='EMP006'),'2025-07-01','2025-07-31',65000,168,0,0,200,0,65000,64800,'Paid'), 
((SELECT employee_id FROM employees WHERE 
employee_number='EMP007'),'2025-07-01','2025-07-31',72000,175,0,0,200,0,72000,71800,'Paid'), 
((SELECT employee_id FROM employees WHERE 
employee_number='EMP008'),'2025-07-01','2025-07-31',56000,160,0,0,0,0,56000,56000,'Paid'), 
((SELECT employee_id FROM employees WHERE 
employee_number='EMP009'),'2025-07-01','2025-07-31',62000,155,0,0,500,0,62000,61500,'Paid'),
((SELECT employee_id FROM employees WHERE 
employee_number='EMP010'),'2025-07-01','2025-07-31',58000,162,0,0,250,0,58000,57750,'Paid'); 

-- Payslips for the sample payroll. 
-- PAYSLIPS 
CREATE TABLE payslips ( 
payslip_id INT AUTO_INCREMENT PRIMARY KEY, 
payroll_id INT NOT NULL UNIQUE, 
payslip_number VARCHAR(50) NOT NULL UNIQUE, 
generated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
file_path VARCHAR(500), 
CONSTRAINT fk_payslip_payroll 
FOREIGN KEY (payroll_id) REFERENCES payroll(payroll_id) 
ON UPDATE CASCADE ON DELETE CASCADE 
) ENGINE=InnoDB; -- PAYSLIPS 


INSERT INTO payslips (payroll_id, payslip_number) 

SELECT payroll_id, CONCAT('PS-', LPAD(payroll_id, 6, '0')) 
FROM payroll; 



-- COMPANY SETTINGS 
CREATE TABLE company_settings ( 
setting_id INT AUTO_INCREMENT PRIMARY KEY, 
setting_key VARCHAR(100) NOT NULL UNIQUE, 
setting_value VARCHAR(500) NOT NULL, 
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE 
CURRENT_TIMESTAMP
) ENGINE=InnoDB; 


INSERT INTO company_settings (setting_key, setting_value) VALUES 
('company_name','ModernTech Solutions'), 
('default_currency','ZAR'), 
('working_hours_per_day','8'), 
('working_days_per_week','5'), 
('timezone','Africa/Johannesburg'); 


-- EMPLOYEE SETTINGS 
CREATE TABLE employee_settings ( 
employee_setting_id INT AUTO_INCREMENT PRIMARY KEY, 
employee_id INT NOT NULL, 
setting_key VARCHAR(100) NOT NULL, 
setting_value VARCHAR(500) NOT NULL, 
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE 
CURRENT_TIMESTAMP, 
CONSTRAINT uq_employee_setting UNIQUE (employee_id, setting_key), 
CONSTRAINT fk_employee_setting_employee 
FOREIGN KEY (employee_id) REFERENCES employees(employee_id) 
ON UPDATE CASCADE ON DELETE CASCADE 
) ENGINE=InnoDB; 
CREATE INDEX idx_employee_settings_employee ON 
employee_settings(employee_id); 

INSERT INTO employee_settings (employee_id, setting_key, setting_value) 
SELECT employee_id, 'theme', 'light' FROM employees; 


-- AUDIT LOG 
-- Records important changes such as leave approvals. 
CREATE TABLE audit_log ( 
audit_id BIGINT AUTO_INCREMENT PRIMARY KEY, 
user_id INT NULL, 
action_type VARCHAR(50) NOT NULL, 
table_name VARCHAR(100) NOT NULL, 
record_id INT NULL, 
old_value JSON NULL, 
new_value JSON NULL, 
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
CONSTRAINT fk_audit_user 
FOREIGN KEY (user_id) REFERENCES users(user_id) 
ON UPDATE CASCADE ON DELETE SET NULL 
) ENGINE=InnoDB; 
CREATE INDEX idx_audit_table_record ON audit_log(table_name, record_id); 
CREATE INDEX idx_audit_created_at ON audit_log(created_at); -- SAMPLE / TEST DATA 

-- TRIGGERS 

DELIMITER $$ 

CREATE TRIGGER trg_leave_status_audit 
AFTER UPDATE ON leave_requests 
FOR EACH ROW 

BEGIN 
IF OLD.status <> NEW.status THEN 
INSERT INTO audit_log (user_id, action_type, table_name, 
record_id, old_value, new_value) 
VALUES ( 
NEW.reviewed_by, 
'STATUS_CHANGE', 
'leave_requests', 
NEW.leave_request_id, 
JSON_OBJECT('status', OLD.status), 
JSON_OBJECT('status', NEW.status) 
); 
END IF; 
END$$ 

CREATE TRIGGER trg_employees_updated_at 
BEFORE UPDATE ON employees 
FOR EACH ROW 

BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$ 

CREATE TRIGGER trg_attendance_updated_at 
BEFORE UPDATE ON attendance 
FOR EACH ROW 

BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END$$ 

CREATE TRIGGER trg_leave_updated_at 
BEFORE UPDATE ON leave_requests 
FOR EACH ROW 

BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END$$ 

CREATE TRIGGER trg_payroll_updated_at 
BEFORE UPDATE ON payroll 
FOR EACH ROW 

BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END$$ 

CREATE TRIGGER trg_performance_updated_at 
BEFORE UPDATE ON performance_reviews 
FOR EACH ROW 

BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END$$ 

CREATE TRIGGER trg_time_entries_updated_at 
BEFORE UPDATE ON time_entries 
FOR EACH ROW 

BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END$$ 

CREATE TRIGGER trg_timesheets_updated_at 
BEFORE UPDATE ON timesheets 
FOR EACH ROW 

BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END$$ 

CREATE TRIGGER trg_shifts_updated_at 
BEFORE UPDATE ON shifts 
FOR EACH ROW

BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END$$ 

CREATE TRIGGER trg_users_updated_at 
BEFORE UPDATE ON users 
FOR EACH ROW 

BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END$$ 

-- STORED PROCEDURES 
CREATE PROCEDURE sp_get_employee_dashboard(IN p_employee_id INT) 

BEGIN 
SELECT 
e.employee_id, 
e.employee_number, 
CONCAT(e.first_name, ' ', e.last_name) AS employee_name, 
p.position_title, 
d.department_name, 
e.salary, 
e.employment_status, 
( 
SELECT COUNT(*) 
FROM attendance a 
WHERE a.employee_id = e.employee_id 
AND a.status = 'Present' 
) AS present_days, 
( 
SELECT COUNT(*) 
FROM leave_requests lr 
WHERE lr.employee_id = e.employee_id 
AND lr.status = 'Pending' 
) AS pending_leave_requests, 
( 
SELECT COALESCE(SUM(t.hours_worked), 0) 
FROM timesheets t 
WHERE t.employee_id = e.employee_id 
) AS total_hours 
FROM employees e 
JOIN positions p ON p.position_id = e.position_id 
JOIN departments d ON d.department_id = p.department_id 
WHERE e.employee_id = p_employee_id; 
END$$ 

CREATE PROCEDURE sp_submit_leave_request(
IN p_employee_id INT, 
IN p_leave_type_id INT, 
IN p_start_date DATE, 
IN p_end_date DATE, 
IN p_reason VARCHAR(500) 
)
 
BEGIN 
DECLARE v_employee_exists INT DEFAULT 0; 
DECLARE v_leave_type_exists INT DEFAULT 0; 
START TRANSACTION; 
SELECT COUNT(*) INTO v_employee_exists 
FROM employees 
WHERE employee_id = p_employee_id 
AND employment_status = 'Active'; 
SELECT COUNT(*) INTO v_leave_type_exists 
FROM leave_types 
WHERE leave_type_id = p_leave_type_id; 
IF v_employee_exists = 0 THEN 
ROLLBACK; 
SIGNAL SQLSTATE '45000' 
SET MESSAGE_TEXT = 'Employee does not exist or is inactive'; 
ELSEIF v_leave_type_exists = 0 THEN 
ROLLBACK; 
SIGNAL SQLSTATE '45000' 
SET MESSAGE_TEXT = 'Invalid leave type'; 
ELSEIF p_end_date < p_start_date THEN 
ROLLBACK; 
SIGNAL SQLSTATE '45000' 
SET MESSAGE_TEXT = 'End date cannot be before start date'; 
ELSE 
INSERT INTO leave_requests 
(employee_id, leave_type_id, start_date, end_date, reason, 
status) 
VALUES 
(p_employee_id, p_leave_type_id, p_start_date, p_end_date, 
p_reason, 'Pending'); 
COMMIT; 
SELECT LAST_INSERT_ID() AS leave_request_id; 
END IF; 
END$$

CREATE PROCEDURE sp_approve_leave_request( 
IN p_leave_request_id INT, 
IN p_reviewer_user_id INT, 
IN p_new_status VARCHAR(20) 
)
 
BEGIN 
DECLARE v_request_exists INT DEFAULT 0; 
DECLARE v_old_status VARCHAR(20); 
START TRANSACTION; 
SELECT COUNT(*), MAX(status) 
INTO v_request_exists, v_old_status 
FROM leave_requests 
WHERE leave_request_id = p_leave_request_id; 
IF v_request_exists = 0 THEN 
ROLLBACK; 
SIGNAL SQLSTATE '45000' 
SET MESSAGE_TEXT = 'Leave request not found'; 
ELSEIF p_new_status NOT IN ('Approved','Denied','Cancelled') THEN 
ROLLBACK; 
SIGNAL SQLSTATE '45000' 
SET MESSAGE_TEXT = 'Invalid leave status'; 
ELSE 
UPDATE leave_requests 
SET status = p_new_status, 
reviewed_by = p_reviewer_user_id, 
reviewed_at = CURRENT_TIMESTAMP 
WHERE leave_request_id = p_leave_request_id; 
COMMIT; 
SELECT p_leave_request_id AS leave_request_id, 
v_old_status AS old_status, 
p_new_status AS new_status; 
END IF; 
END$$ 

CREATE PROCEDURE sp_get_payroll_summary( 
IN p_start_date DATE, 
IN p_end_date DATE 
) 

BEGIN 
SELECT 
e.employee_id, 
e.employee_number,
CONCAT(e.first_name, ' ', e.last_name) AS employee_name, 
d.department_name, 
SUM(pr.gross_pay) AS gross_pay, 
SUM(pr.leave_deductions) AS leave_deductions, 
SUM(pr.other_deductions) AS other_deductions, 
SUM(pr.net_pay) AS net_pay 
FROM payroll pr 
JOIN employees e ON e.employee_id = pr.employee_id 
JOIN positions pos ON pos.position_id = e.position_id 
JOIN departments d ON d.department_id = pos.department_id 
WHERE pr.pay_period_start >= p_start_date 
AND pr.pay_period_end <= p_end_date 
GROUP BY e.employee_id, e.employee_number, 
e.first_name, e.last_name, d.department_name 
ORDER BY e.last_name, e.first_name; 
END$$ 
DELIMITER ; 

-- OPTIMIZED VIEWS / COMMON QUERIES 
CREATE VIEW vw_employee_directory AS 
SELECT 
e.employee_id, 
e.employee_number, 
CONCAT(e.first_name, ' ', e.last_name) AS employee_name, 
e.email, 
e.phone, 
p.position_title, 
d.department_name, 
e.salary, 
e.employment_status, 
e.hire_date 
FROM employees e 
JOIN positions p 
ON p.position_id = e.position_id 
JOIN departments d 
ON d.department_id = p.department_id; 
CREATE VIEW vw_payroll_summary AS 
SELECT 
pr.payroll_id, 
e.employee_number, 
CONCAT(e.first_name, ' ', e.last_name) AS employee_name, 
d.department_name, 
pr.pay_period_start, 
pr.pay_period_end, 
pr.base_salary, 
pr.gross_pay,
pr.leave_deductions, 
pr.other_deductions, 
pr.net_pay, 
pr.payment_status 
FROM payroll pr 
JOIN employees e ON e.employee_id = pr.employee_id 
JOIN positions p 
ON p.position_id = e.position_id 
JOIN departments d 
ON d.department_id = p.department_id; 
CREATE VIEW vw_attendance_summary AS 
SELECT 
e.employee_id, 
e.employee_number, 
CONCAT(e.first_name, ' ', e.last_name) AS employee_name, 
COUNT(a.attendance_id) AS total_records, 
SUM(a.status = 'Present') AS present_days, 
SUM(a.status = 'Absent') AS absent_days, 
SUM(a.status = 'Late') AS late_days, 
SUM(a.status = 'Remote') AS remote_days, 
SUM(a.status = 'On Leave') AS leave_days 
FROM employees e 
LEFT JOIN attendance a 
ON a.employee_id = e.employee_id 
GROUP BY e.employee_id, e.employee_number, e.first_name, e.last_name;

-- EXAMPLE QUERIES FOR THE NODE.JS/EXPRESS BACKEND 
-- GET all employees -- SELECT * FROM vw_employee_directory ORDER BY last_name, first_name; 
-- Search employees -- SELECT * FROM vw_employee_directory 
-- WHERE employee_name LIKE CONCAT('%', ?, '%') 
-- OR department_name LIKE CONCAT('%', ?, '%') 
-- ORDER BY employee_name; 
-- Get one employee 
-- SELECT * FROM vw_employee_directory WHERE employee_id = ?; 
-- Get attendance for one employee 
-- SELECT * FROM attendance 
-- WHERE employee_id = ? 
-- ORDER BY attendance_date DESC; 
-- Get pending leave requests 
-- SELECT lr.*, CONCAT(e.first_name, ' ', e.last_name) AS employee_name, 
-- lt.leave_type_name 

-- FROM leave_requests lr 
-- JOIN employees e ON e.employee_id = lr.employee_id 
-- JOIN leave_types lt ON lt.leave_type_id = lr.leave_type_id 
-- WHERE lr.status = 'Pending' 
-- ORDER BY lr.created_at DESC; 
-- Get payroll for one employee 
-- SELECT * FROM vw_payroll_summary 
-- WHERE employee_number = ? 
-- ORDER BY pay_period_start DESC; 
-- QUICK TESTS 
SELECT COUNT(*) AS departments_count FROM departments; 
SELECT COUNT(*) AS employees_count FROM employees; 
SELECT COUNT(*) AS users_count FROM users; 
SELECT COUNT(*) AS attendance_count FROM attendance; 
SELECT COUNT(*) AS leave_requests_count FROM leave_requests; 
SELECT COUNT(*) AS payroll_count FROM payroll; 
SELECT * FROM vw_employee_directory ORDER BY employee_id;