
# ModernTech Solutions - HR Management System (Backend)

##  Overview

This is the **backend REST API** for the ModernTech Solutions HR Management System. It provides secure data storage, authentication, and business logic for managing employees, attendance, payroll, leave requests, and performance reviews.

The system is built with **Node.js** and **Express.js**, using **MySQL** for data persistence with **JWT** authentication for secure access.

---

##  Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Database Schema](#database-schema)
- [Team Members](#team-members)
- [Project Links](#project-links)

---

##  Features

### Core Features
-  **Employee Management** - CRUD operations for employees
-  **Authentication & Authorization** - JWT-based secure login with role-based access (Admin, HR Manager, Manager, Employee)
-  **Attendance Tracking** - Record and manage daily attendance
-  **Payroll Processing** - Calculate and manage employee payroll
-  **Leave Management** - Submit, approve, and track leave requests
-  **Performance Reviews** - Manage review cycles and employee evaluations
-  **Shift Scheduling** - Create and manage employee shifts
-  **Timesheets** - Track working hours and tasks
-  **Audit Logging** - Track all system changes
-  **Company Settings** - Configure system-wide settings
-  **Employee Settings** - Per-employee preferences

### Security Features
-  Password hashing with bcrypt (12 rounds)
-  JWT authentication with 8-hour expiration
-  Role-based access control (RBAC)
-  SQL injection prevention via parameterized queries
-  Environment variables for sensitive data
-  CORS configuration for frontend access

### Bonus Features
-  Database views for simplified queries
-  Performance indexing
-  Database transactions for critical operations
-  Cloud-ready deployment

---

##  Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18.x+ | Runtime environment |
| **Express.js** | 5.x | Web framework |
| **MySQL** | 8.x | Database |
| **mysql2** | 3.x | MySQL driver |
| **JWT** | 9.x | Authentication |
| **bcryptjs** | 3.x | Password hashing |
| **dotenv** | 17.x | Environment variables |
| **cors** | 2.x | Cross-origin resource sharing |

---

##  Project Structure

```
Core_Project-BACK_END/
├── config/
│   └── db.js                      # Database connection pool
├── controllers/
│   ├── authController.js          # Authentication logic
│   ├── employeeController.js      # Employee CRUD
│   ├── attendanceController.js
│   ├── payrollController.js
│   ├── leaveRequestController.js
│   ├── performanceReviewController.js
│   ├── shiftController.js
│   ├── timesheetController.js
│   ├── userController.js
│   ├── roleController.js
│   ├── permissionController.js
│   ├── departmentController.js
│   ├── positionController.js
│   ├── payslipController.js
│   ├── reviewCycleController.js
│   ├── timeEntryController.js
│   ├── companySettingsController.js
│   ├── employeeSettingsController.js
│   ├── leaveTypeController.js
│   ├── auditLogController.js
│   └── rolePermissionController.js
├── middleware/
│   ├── authMiddleware.js          # JWT authentication
│   └── errorHandler.js            # Centralized error handling
├── models/
│   ├── userModel.js
│   ├── employeeModel.js
│   ├── attendanceModel.js
│   ├── payrollModel.js
│   ├── leaveRequestModel.js
│   ├── performanceReviewModel.js
│   ├── shiftModel.js
│   ├── timesheetModel.js
│   └── ...                        (all model files)
├── routes/
│   ├── authRoutes.js
│   ├── employeeRoutes.js
│   ├── attendanceRoutes.js
│   ├── payrollRoutes.js
│   ├── leaveRequestRoutes.js
│   └── ...                        (all route files)
├── .env                            # Environment variables
├── server.js                       # Entry point
├── package.json                    # Dependencies
├── README.md                       # Documentation
└── .gitignore                      # Git ignore file
```

---

##  Installation

### Prerequisites
- Node.js 18.x or higher
- MySQL 8.x
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/Core_Project-BACK_END.git
cd Core_Project-BACK_END
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

### Step 4: Configure Database
Update the `.env` file with your database credentials:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=hr_management
DB_PORT=3306

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_characters

# CORS
ALLOWED_ORIGINS=http://localhost:5501,http://127.0.0.1:5501

# Security
BCRYPT_ROUNDS=12
```

### Step 5: Create Database
```bash
mysql -u root -p
CREATE DATABASE hr_management;
EXIT;
```

### Step 6: Run Database Setup
```bash
node setup-mysql.js
```

### Step 7: Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
node server.js
```

### Step 8: Get Your JWT Token
```bash
npm run get-token
```

---

## :globe_with_meridians: API Documentation

### Base URL
```
http://localhost:3000/api
```

### Employee Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| GET | `/employees` | Get all employees | 
| GET | `/employees/:id` | Get employee by ID | 
| POST | `/employees` | Create new employee | 
| PUT | `/employees/:id` | Update employee | 
| DELETE | `/employees/:id` | Delete/terminate employee | 

### Attendance Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| GET | `/attendance` | Get all attendance records | 
| GET | `/attendance/:id` | Get attendance by ID | 
| POST | `/attendance` | Create attendance record | 
| PUT | `/attendance/:id` | Update attendance | 
| DELETE | `/attendance/:id` | Delete attendance | 

### Payroll Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| GET | `/payroll` | Get all payroll records | 
| GET | `/payroll/:id` | Get payroll by ID | 
| POST | `/payroll` | Create payroll record | 
| PUT | `/payroll/:id` | Update payroll | 
| DELETE | `/payroll/:id` | Delete payroll | 

### Leave Request Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| GET | `/leave-requests` | Get all leave requests |
| GET | `/leave-requests/:id` | Get leave request by ID |
| POST | `/leave-requests` | Create leave request  |
| PUT | `/leave-requests/:id` | Update leave request | 
| PUT | `/leave-requests/:id/status` | Update request status  |
| DELETE | `/leave-requests/:id` | Delete leave request  |

---

##  Authentication

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "lungile.moyo@moderntech.com",
  "password": "ABC123"
}
```

### Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "Admin"
}
```

### Using the Token
Include the token in all authenticated requests:
```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

---

##  Testing

### Run Smoke Tests
```bash
node smoke-test.js
```

### Run CRUD Tests
```bash
node test-crud.js
```

### Test Database Connection
```bash
node test-db.js
```

### Get JWT Token
```bash
npm run get-token
```

---

## Deployment

### Deploy to Render
1. Create account on Render
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name:** hr-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add environment variables from `.env`
6. Click **Create Web Service**

### Deploy to Railway
1. Create account on Railway
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Add environment variables
5. Click **Deploy**

---

## Database Schema

### Core Tables
| Table | Description |
|-------|--------------|
| `departments` | Company departments |
| `positions` | Job positions |
| `employees` | Employee records |
| `roles` | User roles (Admin, HR Manager, Manager, Employee) |
| `users` | User accounts with authentication |
| `attendance` | Daily attendance records |
| `leave_types` | Types of leave (Annual, Sick, etc.) |
| `leave_requests` | Employee leave requests |
| `payroll` | Payroll calculations |
| `payslips` | Generated payslips |
| `shifts` | Employee shift schedules |
| `timesheets` | Working hours tracking |
| `performance_reviews` | Employee performance evaluations |
| `review_cycles` | Performance review periods |

### Views
| View | Description |
|------|--------------|
| `vw_employee_directory` | Employee details with position and department |
| `vw_attendance_summary` | Attendance statistics per employee |
| `vw_payroll_summary` | Payroll summary with employee details |
| `vw_leave_balances` | Leave balances per employee |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `ER_ACCESS_DENIED_ERROR` | Check `DB_PASSWORD` in `.env` |
| `ER_BAD_DB_ERROR` | Create database: `CREATE DATABASE hr_management;` |
| `JWT_SECRET is not defined` | Add `JWT_SECRET` to `.env` |
| Port 3000 already in use | Change `PORT` in `.env` or kill the process |
| Cannot connect to MySQL | Start MySQL: `net start MySQL80` |

### API Response Examples

**Successful Response**
```json
{
  "employee_id": 1,
  "message": "Employee created successfully"
}
```

**Error Response**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## Team Members

| Name | Role | Responsibilities |
|------|------|-------------------|
| **Nuriyah** | Database & Data Architecture | Build the complete SQL database, design structure, create tables, establish relationships, normalize up to 3NF, add constraints, insert test data, create queries, add indexes, prepare ERD and database documentation, implement stored procedures, triggers, transactions, and database indexing |
| **Krishendree** | Backend & API Development | Build server-side application and API, set up Node.js/Express backend, create API routes, connect to database, implement CRUD operations, employee/department/attendance/payroll management, create reusable database functions, implement server-side validation, return consistent HTTP responses, implement backend error handling |
| **Kirsten** | Authentication, Security & Validation | Secure the entire application, implement registration/login, credential verification, JWT session/token creation, password hashing (bcrypt), environment variables, SQL injection protection, input sanitization, authentication middleware, role-based access control (Admin, HR Manager, Manager, Employee), protect API endpoints, secure database connections |
| **Ahlumile** | Frontend Integration & Testing | Connect existing HR interface to API, replace mock data with real database data, connect all forms, connect login interface to authentication, implement loading states, display success/error messages, test API endpoints using Postman, test invalid input/missing fields/unauthorized requests, perform full-system integration testing, prepare README and API documentation, organize GitHub documentation and testing evidence |

---

##  Project Links

| Resource | Link |
|----------|------|
| **Figma Design** | [Frontend and Backend Figma](https://www.figma.com/design/KXBXtBw0OjBTN9noFOXR3u/Frontend-and-Backend-Figma?node-id=0-1&t=AqAaRKW2L3ztFZSU-1) |
| **Documentation** | [Google Docs - SDLC Documentation](https://docs.google.com/document/d/14HppWF4ZQr7QjfzD87FMC6GChG4gXX3zvSdEkyJf3YM/edit?usp=sharing) |
| **GitHub Repository** | [Core_Project-BACK_END](https://github.com/totoseahlumile-dot/Core_Project-BACK_END) |
| **Frontend Repository** | [core-project](https://github.com/NuriyahD/core-project.git) |

---

##  Quick Start Commands

```bash
# Clone repository
git clone https://github.com/yourusername/Core_Project-BACK_END.git

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your credentials

# Create database
mysql -u root -p -e "CREATE DATABASE hr_management;"

# Setup database tables
node setup-mysql.js

# Start server
npm run dev

# Get JWT token
npm run get-token

# Run tests
node test-api.js
```

---

Made by Team 5

| Name | Role |
|------|------|
| Nuriyah | Database & Data Architecture |
| Krishendree | Backend & API Development |
| Kirsten | Authentication, Security & Validation |
| Ahlumile | Frontend Integration & Testing |
