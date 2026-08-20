import express from 'express';
import {
  getPayroll,
  getPayrollById,
  addPayroll,
  editPayroll,
  removePayroll,
} from '../controllers/payrollController.js';
import { validateId, validatePayroll } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getPayroll);
router.get('/:id', validateId, getPayrollById);
router.post('/', validatePayroll, addPayroll);
router.put('/:id', validateId, validatePayroll, editPayroll);
router.delete('/:id', validateId, removePayroll);

export default router;