import express from 'express';
import {
  getRolePermissions,
  getRolePermission,
  addRolePermission,
  removeRolePermission,
} from '../controllers/rolePermissionController.js';
import { validateRolePermission } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getRolePermissions);
router.get('/:roleId/:permissionId', validateRolePermission, getRolePermission);
router.post('/', validateRolePermission, addRolePermission);
router.delete('/:roleId/:permissionId', validateRolePermission, removeRolePermission);

export default router;