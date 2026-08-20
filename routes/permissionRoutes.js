import express from 'express';
import {
  getPermissions,
  getPermission,
  addPermission,
  editPermission,
  removePermission,
} from '../controllers/permissionController.js';
import { validateId, validatePermission } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getPermissions);
router.get('/:id', validateId, getPermission);
router.post('/', validatePermission, addPermission);
router.put('/:id', validateId, validatePermission, editPermission);
router.delete('/:id', validateId, removePermission);

export default router;