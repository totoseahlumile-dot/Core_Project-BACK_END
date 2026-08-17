import express from 'express';
import {
  getAuditLogs,
  getAuditLog,
  addAuditLog,
  editAuditLog,
  removeAuditLog,
} from '../controllers/auditLogController.js';

const router = express.Router();

router.get('/', getAuditLogs);
router.get('/:id', getAuditLog);
router.post('/', addAuditLog);
router.put('/:id', editAuditLog);
router.delete('/:id', removeAuditLog);

export default router;
