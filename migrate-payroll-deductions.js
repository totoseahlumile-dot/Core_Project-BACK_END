import 'dotenv/config';
import db from './config/db.js';

const ensureColumn = async (column, definition) => {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS count
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'payroll' AND COLUMN_NAME = ?`,
    [column]
  );
  if (!rows[0].count) {
    await db.query(`ALTER TABLE payroll ADD COLUMN ${column} ${definition}`);
  }
};

try {
  await ensureColumn('paye_deduction', 'DECIMAL(12,2) NOT NULL DEFAULT 0.00 AFTER other_deductions');
  await ensureColumn('uif_deduction', 'DECIMAL(12,2) NOT NULL DEFAULT 0.00 AFTER paye_deduction');

  const [result] = await db.query(
    `UPDATE payroll
     SET paye_deduction = ROUND(gross_pay * 0.15, 2),
         uif_deduction = ROUND(gross_pay * 0.01, 2),
         net_pay = ROUND(
           gross_pay
           - ROUND(gross_pay * 0.15, 2)
           - ROUND(gross_pay * 0.01, 2)
           - leave_deductions
           - other_deductions,
           2
         )`
  );
  console.log(`Payroll deduction columns ready; ${result.affectedRows} records recalculated.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await db.end();
}
