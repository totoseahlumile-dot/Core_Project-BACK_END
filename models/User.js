const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(username, email, plainPassword, roleId) {
    const hashedPassword = await bcrypt.hash(plainPassword, 12);
    const sql = `INSERT INTO users (username, email, password_hash, role_id) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [username, email, hashedPassword, roleId]);
    return result.insertId;
  }

  static async findByEmail(email) {
    const sql = `
      SELECT u.user_id, u.username, u.email, u.password_hash, r.role_name 
      FROM users u 
      JOIN roles r ON u.role_id = r.role_id 
      WHERE u.email = ?
    `;
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;