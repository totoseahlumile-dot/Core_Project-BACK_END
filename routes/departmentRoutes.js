import express from 'express';
import {
  getDepartments,
  getDepartment,
  addDepartment,
  editDepartment,
  removeDepartment,
} from '../controllers/departmentController.js';
import { validateId, validateDepartment } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getDepartments);
router.get('/:id', validateId, getDepartment);
router.post('/', validateDepartment, addDepartment);
router.put('/:id', validateId, validateDepartment, editDepartment);
router.delete('/:id', validateId, removeDepartment);

export default router;