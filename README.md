# ModernTech HR Management API

The backend for the ModernTech HR Management System. It is a deployed
Express/MySQL API that powers employee management, attendance, time off,
payroll, payslips, timesheets, scheduling, and performance-review workflows.

- **Live frontend:** https://nuriyahd.github.io/core-project/
- **API health check:** https://passionate-integrity-production-55e8.up.railway.app/api/health
- **Frontend repository:** https://github.com/NuriyahD/core-project

## System architecture

```text
GitHub Pages frontend
        |
        | HTTPS JSON requests with a JWT Bearer token
        v
Railway Express API
        |
        | Parameterized SQL through a MySQL connection pool
        v
Railway MySQL database
```

The backend uses a layered structure:

- `routes/` defines API endpoints.
- `controllers/` validates input and applies workflow rules.
- `models/` contains parameterized MySQL queries.
- `middleware/` handles authentication, authorization, errors, and 404 responses.
- `config/db.js` manages the shared MySQL connection pool.
- `server.js` configures Express, CORS, middleware, routes, and the health check.

## Main features

- bcrypt password hashing and JWT authentication
- Eight-hour authenticated sessions
- Centralized HR Manager and Employee authorization rules
- Employee-level filtering for private records
- Employee directory, departments, positions, roles, and permissions
- Attendance records with live clock-in and clock-out
- Time-off submission, approval, denial, and notifications
- Payroll, deductions, payslips, and payroll summaries
- Shifts, time entries, and timesheets
- Review cycles and persisted performance-review progression
- Dashboard metrics and charts backed by database records
- CORS allow-listing for local development and GitHub Pages
- Parameterized SQL and consistent JSON error responses

## Requirements

- Node.js 20 or newer
- npm
- MySQL 8

## Local setup

1. Clone the repository:

   ```bash
   git clone https://github.com/totoseahlumile-dot/Core_Project-BACK_END.git
   cd Core_Project-BACK_END
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and configure it:

   ```env
   PORT=3000
   CORS_ORIGINS=http://127.0.0.1:5501,http://localhost:5501

   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_database_password
   DB_NAME=moderntech_hr

   JWT_SECRET=replace_with_a_long_random_secret
   ```

4. Import `database.sql` into `moderntech_hr`.
5. Run `npm run dev`.
6. Confirm availability at http://localhost:3000/api/health.

On Windows systems where PowerShell blocks `npm.ps1`, use:

```powershell
npm.cmd run dev
```

## Railway deployment

Create one Railway project containing the backend GitHub service and a MySQL
service. Add these variables to the backend service:

```env
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
CORS_ORIGINS=https://nuriyahd.github.io
JWT_SECRET=replace_with_a_unique_random_secret
```

Railway provides the application `PORT`; do not hard-code it in production.
Generate a public service domain using the port shown in the deployment logs.

The Railway MySQL service starts empty. Import `database.sql` through MySQL
Workbench using the public host and port from `MYSQL_PUBLIC_URL`. The private
`mysql.railway.internal:3306` address works only between Railway services.

Never commit `.env`, reveal Railway variables, or expose `JWT_SECRET`.

## Authentication and access control

Public endpoints:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/health
```

All other `/api` endpoints require:

```http
Authorization: Bearer <jwt-token>
```

HR Managers can manage organization-wide HR data. Employees have restricted
self-service access to their own attendance, leave requests, settings, and
payslips. The backend derives employee ownership from the verified JWT rather
than trusting an employee ID supplied by the browser.

## Main API resources

```text
/api/employees
/api/departments
/api/positions
/api/attendance
/api/leave-requests
/api/leave-types
/api/payroll
/api/payslips
/api/performance-reviews
/api/review-cycles
/api/shifts
/api/time-entries
/api/timesheets
/api/company-settings
/api/employee-settings
/api/users
/api/roles
/api/permissions
/api/role-permissions
/api/audit-logs
```

## Demo login

After importing the database, reset and verify the active demo accounts:

```bash
npm run seed-demo-logins
```

Use the HR Manager account:

```text
Email: lungile.moyo@moderntech.com
Password: ABC12345
```

The demo password is intended only for demonstrations and local development.
Use individual strong passwords in a real production environment.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the production server |
| `npm run dev` | Start with automatic restart through nodemon |
| `npm run seed-demo-logins` | Reset active demo employee passwords |
| `npm run set-password -- email password` | Set one account password |
| `npm run migrate-payroll` | Add payroll deduction fields safely |

## Important workflow rules

- Only one attendance record is stored per employee per day.
- Clock-out requires an existing clock-in and can happen only once.
- Non-HR leave submissions are assigned to the employee ID in the JWT.
- Review-cycle UI states map to database values: `Draft`, `Submitted`, and
  `Completed`.
- Repeated review generation is idempotent and does not create duplicates.
- Foreign keys protect relationships and cascade dependent employee records
  where appropriate.

## Presentation material

- [Presentation guide](./PRESENTATION_GUIDE.md)
- [Presentation guide PDF](./PRESENTATION_GUIDE.pdf)

The guide includes the system architecture, a five-minute demonstration flow,
technical decisions, common presentation questions, and a pre-demo checklist.
