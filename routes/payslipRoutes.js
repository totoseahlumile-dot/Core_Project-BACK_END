import express from 'express';
import {
  getPayslips,
  getPayslip,
  addPayslip,
  editPayslip,
  removePayslip,
} from '../controllers/payslipController.js';
import { validateId, validatePayslip } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getPayslips);
router.get('/:id', validateId, getPayslip);
router.post('/', validatePayslip, addPayslip);
router.put('/:id', validateId, validatePayslip, editPayslip);
router.delete('/:id', validateId, removePayslip);

export default router;