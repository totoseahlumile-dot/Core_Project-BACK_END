# Core Project API

Express/MySQL API for the Core Project frontend.

## Architecture and features

The application uses a layered Express architecture: routes authenticate and
authorize requests, controllers validate workflow input, models execute
parameterized MySQL queries, and the static client consumes the JSON API through
one authenticated `api.js` gateway. Foreign keys connect users, employees,
departments, payroll, attendance, leave, timesheets, and performance reviews.

- JWT authentication with bcrypt password hashing and role-based access
- HR Manager access to employees, attendance, leave approval, payroll and reviews
- Employee access limited to personal time off, payslips, settings and clocking
- Live attendance clock-in/out and HR time-off notification polling
- Persisted payroll deductions, payslips, work hours and performance reviews
- Backend-powered dashboard metrics, recent employees and attendance charts
- Consistent JSON errors, request validation, CORS allow-listing and SQL parameters

## Local setup

1. Copy `.env.example` to `.env` and enter the MySQL credentials and a strong JWT secret.
2. Run `npm install`, then `npm run dev`.
3. Serve the frontend repository on port `5501` and open `http://127.0.0.1:5501`.

The API defaults to `http://localhost:3000`. Use `GET /api/health` to check availability. `CORS_ORIGINS` accepts a comma-separated list of permitted frontend origins.

## Useful commands

- `npm run dev` — start the API with automatic restart
- `npm run seed-demo-logins` — create/refresh employee demo accounts
- `npm run set-password -- user@example.com NewPassword` — set one account password
- `npm run migrate-payroll` — add payroll deduction fields safely

Never commit `.env`; use `.env.example` to document required configuration.

## Main workflows

HR Managers can add employees, configure payroll and payslips, approve time off,
correct attendance, log hours, and create or edit reviews. Employees use the
top navigation to clock in/out, read notifications/session status, open account
settings, change their password, request leave and view only their own payslips.
The sidebar toggle is remembered locally and allows full-width chart viewing.
