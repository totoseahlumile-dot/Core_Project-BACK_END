import db from '../config/db.js';

export const getAllEmployees = async () => {
  const [rows] = await db.query(
    'SELECT * FROM vw_employee_directory ORDER BY employee_name'
  );
  return rows;
};

export const getEmployeeById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM vw_employee_directory WHERE employee_id = ?',
    [id]
  );
  return rows[0];
};

export const createEmployee = async (data) => {
  const {
    employee_number, first_name, last_name, email, phone,
    position_id, salary, hire_date,
  } = data;
  const [result] = await db.query(
    `INSERT INTO employees
     (employee_number, first_name, last_name, email, phone, position_id, salary, hire_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [employee_number, first_name, last_name, email, phone, position_id, salary, hire_date]
  );
  return result.insertId;
};

export const updateEmployee = async (id, data) => {
  const {
    first_name, last_name, email, phone, position_id, salary, employment_status,
  } = data;
  const [result] = await db.query(
    `UPDATE employees
     SET first_name = ?, last_name = ?, email = ?, phone = ?,
         position_id = ?, salary = ?, employment_status = ?
     WHERE employee_id = ?`,
    [first_name, last_name, email, phone, position_id, salary, employment_status, id]
  );
  return result.affectedRows;
};

export const terminateEmployee = async (id) => {
  const [result] = await db.query(
    `UPDATE employees
     SET employment_status = 'Terminated', termination_date = CURDATE()
     WHERE employee_id = ?`,
    [id]
  );
  return result.affectedRows;
};
