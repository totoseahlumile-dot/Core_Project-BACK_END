import express from 'express';
import {
  getEmployees, getEmployee, addEmployee, editEmployee, removeEmployee,
} from '../controllers/employeeController.js';

const router = express.Router();

router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.post('/', addEmployee);
router.put('/:id', editEmployee);
router.delete('/:id', removeEmployee);

export default router;