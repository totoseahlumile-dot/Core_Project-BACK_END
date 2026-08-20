// test-crud.js — run with: node test-crud.js
const BASE = 'http://localhost:3000/api';
let passed = 0;
let failed = 0;

const test = async (name, fn, expectedStatus) => {
  try {
    const res = await fn();
    const body = await res.json().catch(() => ({}));
    const ok = res.status === expectedStatus;
    if (ok) {
      passed++;
      console.log(`✅ ${name} → ${res.status}`);
    } else {
      failed++;
      console.log(`❌ ${name} → got ${res.status}, expected ${expectedStatus}`);
      console.log(`   ${JSON.stringify(body)}`);
    }
    return body;
  } catch (err) {
    failed++;
    console.log(`❌ ${name} → CRASHED: ${err.message}`);
    return {};
  }
};

const post = (path, data) => fetch(`${BASE}${path}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

const put = (path, data) => fetch(`${BASE}${path}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

const run = async () => {
  const stamp = Date.now();
  const day = (stamp % 27) + 1;

  console.log('=== CORE: EMPLOYEES ===');
  const emp = await test('POST employee - happy path', () => post('/employees', {
    employee_number: `EMP${stamp}`,
    first_name: 'Test', last_name: 'User',
    email: `test${stamp}@moderntech.com`,
    position_id: 1, salary: 50000, hire_date: '2026-01-01',
  }), 201);
  const empId = emp.employee_id || 1;

  await test('POST employee - missing field', () => post('/employees', {
    first_name: 'No', last_name: 'Email',
  }), 400);

  await test('POST employee - duplicate', () => post('/employees', {
    employee_number: `EMP${stamp}`, first_name: 'Dup', last_name: 'Test',
    email: `test${stamp}@moderntech.com`, position_id: 1, salary: 50000, hire_date: '2026-01-01',
  }), 409);

  await test('PUT employee - valid update', () => put(`/employees/${empId}`, {
    first_name: 'Updated', last_name: 'User', email: `test${stamp}@moderntech.com`,
    phone: null, position_id: 1, salary: 55000, employment_status: 'Active',
  }), 200);

  await test('PUT employee - nonexistent ID', () => put('/employees/999999', {
    first_name: 'X', last_name: 'Y', email: 'x@x.com',
    phone: null, position_id: 1, salary: 1000, employment_status: 'Active',
  }), 404);

  console.log('\n=== CORE: ATTENDANCE ===');
  await test('POST attendance - happy path', () => post('/attendance', {
    employee_id: empId, attendance_date: `2026-08-${day}`, status: 'Present',
  }), 201);

  await test('POST attendance - missing field', () => post('/attendance', {
    employee_id: empId, attendance_date: '2026-08-15',
  }), 400);

  await test('POST attendance - nonexistent employee', () => post('/attendance', {
    employee_id: 999999, attendance_date: '2026-08-16', status: 'Present',
  }), 400);

  console.log('\n=== REFERENCE DATA ===');
  const dept = await test('POST department - happy path', () => post('/departments', {
    department_name: `TestDept${stamp}`, description: 'Smoke test department',
  }), 201);

  await test('POST position - happy path', () => post('/positions', {
    department_id: dept.department_id || 1,
    position_title: `TestRole${stamp}`, description: 'Smoke test role',
  }), 201);

  const leaveType = await test('POST leave type - happy path', () => post('/leave-types', {
    leave_type_name: `TestLeave${stamp}`, description: 'Smoke test leave', paid: true, default_days_per_year: 10,
  }), 201);
  const leaveTypeId = leaveType.leave_type_id || 1;

  console.log('\n=== CORE: LEAVE REQUESTS ===');
  await test('POST leave request - happy path', () => post('/leave-requests', {
    employee_id: empId, leave_type_id: leaveTypeId,
    start_date: '2026-08-20', end_date: '2026-08-21', reason: 'Test',
  }), 201);

  await test('POST leave request - end before start', () => post('/leave-requests', {
    employee_id: empId, leave_type_id: leaveTypeId,
    start_date: '2026-08-20', end_date: '2026-08-19', reason: 'Bad dates',
  }), 400);

  console.log('\n=== CORE: PAYROLL ===');
  const payroll = await test('POST payroll - happy path', () => post('/payroll', {
    employee_id: empId,
    pay_period_start: `2026-0${(stamp % 8) + 1}-01`,
    pay_period_end: `2026-0${(stamp % 8) + 1}-28`,
    base_salary: 70000, hours_worked: 160, leave_deductions: 500,
    gross_pay: 70000, net_pay: 69500,
  }), 201);

  await test('POST payroll - negative salary', () => post('/payroll', {
    employee_id: empId, pay_period_start: '2026-09-01', pay_period_end: '2026-09-28',
    base_salary: -500, hours_worked: 160, leave_deductions: 0,
    gross_pay: -500, net_pay: -500,
  }), 400);

  console.log('\n=== AUTH ===');
  const registerRes = await test('POST auth register - happy path', () => post('/auth/register', {
    email: `authtest${stamp}@moderntech.com`, password: 'TestPass123',
    employee_id: empId, role_id: 3,
  }), 201);

  const loginRes = await test('POST auth login - happy path', () => post('/auth/login', {
    email: `authtest${stamp}@moderntech.com`, password: 'TestPass123',
  }), 200);

  console.log(`\n=== RESULTS: ${passed} passed, ${failed} failed (${passed + failed} total) ===`);
};

run();