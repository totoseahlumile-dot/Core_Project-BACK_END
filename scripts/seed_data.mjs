import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const normalize = (value = '') => String(value).replace(/\s+/g, ' ').trim();

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3307),
  });

  const employeeInfo = JSON.parse(
    fs.readFileSync('C:/Users/Admin/Documents/core-project/data/employee_info.json', 'utf8')
  ).employeeInformation;

  const payrollData = JSON.parse(
    fs.readFileSync('C:/Users/Admin/Documents/core-project/data/payroll_data.json', 'utf8')
  ).payrollData;

  const attendanceData = JSON.parse(
    fs.readFileSync('C:/Users/Admin/Documents/core-project/data/attendance.json', 'utf8')
  ).attendanceAndLeave;

  const [positionRows] = await conn.query('SELECT position_id, position_title FROM positions');
  const positionMap = new Map(
    positionRows.map((r) => [normalize(r.position_title), r.position_id])
  );

  const [departmentRows] = await conn.query('SELECT department_id, department_name FROM departments');
  const departmentMap = new Map(
    departmentRows.map((r) => [normalize(r.department_name), r.department_id])
  );

  await conn.query('DELETE FROM leave_requests');
  await conn.query('DELETE FROM payroll');
  await conn.query('DELETE FROM attendance');
  await conn.query('DELETE FROM employment_history');
  await conn.query('DELETE FROM employees');

  const employeeIdByExternal = new Map();

  for (const emp of employeeInfo) {
    const fullName = normalize(emp.name || '');
    const idx = fullName.lastIndexOf(' ');
    const first_name = idx > 0 ? fullName.slice(0, idx) : fullName;
    const last_name = idx > 0 ? fullName.slice(idx + 1) : '';
    const employee_number = `EMP-${String(emp.employeeId).padStart(3, '0')}`;
    const position_id = positionMap.get(normalize(emp.position)) || 1;
    const department_id = departmentMap.get(normalize(emp.department)) || 1;
    const salary = Number(emp.salary || 0);
    const employmentHistory = String(emp.employmentHistory || '');
    const hireYear = Number(employmentHistory.match(/(\d{4})/)?.[1] || '2020');
    const hire_date = `${hireYear}-01-01`;

    const [result] = await conn.query(
      `INSERT INTO employees (employee_number, first_name, last_name, email, phone, position_id, salary, employment_status, hire_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [employee_number, first_name, last_name, emp.contact, '000-000-0000', position_id, salary, 'Active', hire_date]
    );

    employeeIdByExternal.set(emp.employeeId, result.insertId);

    await conn.query(
      `INSERT INTO employment_history (employee_id, position_id, start_date, end_date, notes)
       VALUES (?, ?, ?, ?, ?)` ,
      [result.insertId, position_id, `${hireYear}-01-01`, null, employmentHistory]
    );
  }

  for (const item of payrollData) {
    const employee_id = employeeIdByExternal.get(item.employeeId);
    if (!employee_id) continue;

    const employeeRecord = employeeInfo.find((e) => e.employeeId === item.employeeId) || {};
    const gross_salary = Number(employeeRecord.salary || 0);
    const net_salary = Number(item.finalSalary || 0);
    const deductions = Number((gross_salary - net_salary).toFixed(2));

    await conn.query(
      `INSERT INTO payroll (employee_id, pay_period_start, pay_period_end, gross_salary, deductions, net_salary, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)` ,
      [employee_id, '2025-07-01', '2025-07-31', gross_salary, deductions, net_salary, 'Paid']
    );
  }

  for (const group of attendanceData) {
    const employee_id = employeeIdByExternal.get(group.employeeId);
    if (!employee_id) continue;

    for (const attendance of group.attendance || []) {
      const status = attendance.status || 'Present';
      const check_in = status === 'Present' ? `${attendance.date} 09:00:00` : null;
      const check_out = status === 'Present' ? `${attendance.date} 17:00:00` : null;
      const notes = status === 'Absent' ? 'No attendance recorded' : null;

      await conn.query(
        `INSERT INTO attendance (employee_id, attendance_date, check_in, check_out, status, notes)
         VALUES (?, ?, ?, ?, ?, ?)` ,
        [employee_id, attendance.date, check_in, check_out, status, notes]
      );
    }

    for (const leave of group.leaveRequests || []) {
      const leaveTypeMap = {
        'Sick Leave': 'Sick',
        'Medical Appointment': 'Sick',
        'Family Responsibility': 'Personal',
        'Vacation': 'Annual',
        'Bereavement': 'Personal',
        'Childcare': 'Personal',
        Personal: 'Personal',
      };

      const leave_status = leave.status === 'Denied' ? 'Rejected' : leave.status;
      const leave_type = leaveTypeMap[leave.reason] || 'Other';

      await conn.query(
        `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, total_days, reason, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)` ,
        [employee_id, leave_type, leave.date, leave.date, 1, leave.reason || 'Leave', leave_status]
      );
    }
  }

  const summary = {
    employees: (await conn.query('SELECT COUNT(*) AS c FROM employees'))[0][0].c,
    payroll: (await conn.query('SELECT COUNT(*) AS c FROM payroll'))[0][0].c,
    leave_requests: (await conn.query('SELECT COUNT(*) AS c FROM leave_requests'))[0][0].c,
    attendance: (await conn.query('SELECT COUNT(*) AS c FROM attendance'))[0][0].c,
    employment_history: (await conn.query('SELECT COUNT(*) AS c FROM employment_history'))[0][0].c,
  };

  console.log(JSON.stringify(summary, null, 2));
  await conn.end();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
