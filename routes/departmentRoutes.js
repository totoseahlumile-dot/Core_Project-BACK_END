import express from 'express';
import {
  getDepartments,
  getDepartment,
  addDepartment,
  editDepartment,
  removeDepartment,
} from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', getDepartments);
router.get('/:id', getDepartment);
router.post('/', addDepartment);
router.put('/:id', editDepartment);
router.delete('/:id', removeDepartment);

export default router;
