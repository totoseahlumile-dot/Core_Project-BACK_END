// smoke-test.js — run with: node smoke-test.js
const BASE = 'http://localhost:3000/api';

const endpoints = [
  'employees', 'departments', 'positions', 'attendance', 'payroll',
  'leave-requests', 'leave-types', 'audit-logs', 'company-settings',
  'employee-settings', 'payslips', 'performance-reviews', 'review-cycles',
  'time-entries', 'shifts', 'timesheets', 'users', 'roles',
  'permissions', 'role-permissions',
];

const run = async () => {
  console.log(`Testing ${endpoints.length} endpoints...\n`);
  for (const ep of endpoints) {
    try {
      const res = await fetch(`${BASE}/${ep}`);
      const icon = res.ok ? '✅' : '❌';
      console.log(`${icon} GET /api/${ep} → ${res.status}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.log(`   ${body.error || body.message || 'no error message'}`);
      }
    } catch (err) {
      console.log(`❌ GET /api/${ep} → CRASHED: ${err.message}`);
    }
  }
};

run();