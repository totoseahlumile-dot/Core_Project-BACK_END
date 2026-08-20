import express from 'express';
import {
  getEmployeeSettings,
  getEmployeeSetting,
  addEmployeeSetting,
  editEmployeeSetting,
  removeEmployeeSetting,
} from '../controllers/employeeSettingsController.js';
import { validateId, validateEmployeeSetting } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getEmployeeSettings);
router.get('/:id', validateId, getEmployeeSetting);
router.post('/', validateEmployeeSetting, addEmployeeSetting);
router.put('/:id', validateId, validateEmployeeSetting, editEmployeeSetting);
router.delete('/:id', validateId, removeEmployeeSetting);

export default router;