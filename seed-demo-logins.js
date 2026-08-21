import 'dotenv/config';
import bcrypt from 'bcryptjs';
import db from './config/db.js';

const demoPassword = process.env.DEMO_PASSWORD || 'ABC12345';

try {
  const passwordHash = await bcrypt.hash(demoPassword, 12);
  const [employeeRoles] = await db.query(
    "SELECT role_id FROM roles WHERE role_name = 'Employee' LIMIT 1"
  );
  if (!employeeRoles[0]) throw new Error('Employee role is not configured');

  const [employees] = await db.query(
    `SELECT employee_id, email
     FROM employees
     WHERE employment_status = 'Active'
       AND employee_number REGEXP '^EMP[0-9]{3}$'`
  );

  for (const employee of employees) {
    const [existing] = await db.query(
      'SELECT user_id FROM users WHERE employee_id = ? OR LOWER(email) = LOWER(?) LIMIT 1',
      [employee.employee_id, employee.email]
    );

    if (existing[0]) {
      await db.query(
        `UPDATE users
         SET email = ?, password_hash = ?, is_active = 1, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ?`,
        [employee.email.toLowerCase(), passwordHash, existing[0].user_id]
      );
    } else {
      await db.query(
        `INSERT INTO users (employee_id, role_id, email, password_hash, is_active)
         VALUES (?, ?, ?, ?, 1)`,
        [employee.employee_id, employeeRoles[0].role_id, employee.email.toLowerCase(), passwordHash]
      );
    }
  }

  const [accounts] = await db.query(
    `SELECT e.employee_number, CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
            u.email, u.password_hash, r.role_name
     FROM employees e
     JOIN users u ON u.employee_id = e.employee_id
     JOIN roles r ON r.role_id = u.role_id
     WHERE e.employee_number REGEXP '^EMP[0-9]{3}$'
     ORDER BY e.employee_number`
  );
  const verified = await Promise.all(
    accounts.map(account => bcrypt.compare(demoPassword, account.password_hash))
  );
  if (accounts.length !== employees.length || verified.some(result => !result)) {
    throw new Error('One or more demo logins could not be verified');
  }

  console.log(`Demo login password set and verified for ${accounts.length} real employee accounts:`);
  accounts.forEach(account => {
    console.log(`${account.employee_number} | ${account.employee_name} | ${account.email} | ${account.role_name}`);
  });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await db.end();
}
