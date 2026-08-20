import express from 'express';
import {
  getEmployees, getEmployee, addEmployee, editEmployee, removeEmployee,
} from '../controllers/employeeController.js';
import { validateId, validateEmployee } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getEmployees);
router.get('/:id', validateId, getEmployee);
router.post('/', validateEmployee, addEmployee);
router.put('/:id', validateId, validateEmployee, editEmployee);
router.delete('/:id', validateId, removeEmployee);

export default router;