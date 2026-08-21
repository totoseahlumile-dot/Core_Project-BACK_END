import bcrypt from 'bcryptjs';
import db from './config/db.js';

const [, , emailArg, password] = process.argv;
const email = emailArg?.trim().toLowerCase();

if (!email || !password) {
  console.error('Usage: node set-password.js <email> <new-password>');
  process.exitCode = 1;
} else if (password.length < 8) {
  console.error('Password must be at least 8 characters.');
  process.exitCode = 1;
} else {
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const [result] = await db.query(
      'UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?',
      [passwordHash, email],
    );

    if (result.affectedRows !== 1) {
      console.error(`No unique user account found for ${email}.`);
      process.exitCode = 1;
    } else {
      const response = await fetch(`http://localhost:${process.env.PORT || 3000}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || body.message || `Login verification failed (${response.status})`);
      }
      console.log(`Password updated and login verified for ${email}.`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
}
