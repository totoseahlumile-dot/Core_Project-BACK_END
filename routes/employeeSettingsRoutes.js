import express from 'express';
import {
  getEmployeeSettings,
  getEmployeeSetting,
  addEmployeeSetting,
  editEmployeeSetting,
  removeEmployeeSetting,
} from '../controllers/employeeSettingsController.js';

const router = express.Router();

router.get('/', getEmployeeSettings);
router.get('/:id', getEmployeeSetting);
router.post('/', addEmployeeSetting);
router.put('/:id', editEmployeeSetting);
router.delete('/:id', removeEmployeeSetting);

export default router;
