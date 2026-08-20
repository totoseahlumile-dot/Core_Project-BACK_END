import express from 'express';
import {
  getAuditLogs,
  getAuditLog,
  addAuditLog,
  editAuditLog,
  removeAuditLog,
} from '../controllers/auditLogController.js';
import { validateId, validateAuditLog } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getAuditLogs);
router.get('/:id', validateId, getAuditLog);
router.post('/', validateAuditLog, addAuditLog);
router.put('/:id', validateId, validateAuditLog, editAuditLog);
router.delete('/:id', validateId, removeAuditLog);

export default router;