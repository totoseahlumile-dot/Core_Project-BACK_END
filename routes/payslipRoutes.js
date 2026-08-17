import express from 'express';
import {
  getPayslips,
  getPayslip,
  addPayslip,
  editPayslip,
  removePayslip,
} from '../controllers/payslipController.js';

const router = express.Router();

router.get('/', getPayslips);
router.get('/:id', getPayslip);
router.post('/', addPayslip);
router.put('/:id', editPayslip);
router.delete('/:id', removePayslip);

export default router;
