import express from 'express';
import {
  getPayroll,
  getPayrollById,
  addPayroll,
  editPayroll,
  removePayroll,
} from '../controllers/payrollController.js';

const router = express.Router();

router.get('/', getPayroll);
router.get('/:id', getPayrollById);
router.post('/', addPayroll);
router.put('/:id', editPayroll);
router.delete('/:id', removePayroll);

export default router;
