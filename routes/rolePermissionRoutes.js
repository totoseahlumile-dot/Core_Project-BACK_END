import express from 'express';
import {
  getRolePermissions,
  getRolePermission,
  addRolePermission,
  removeRolePermission,
} from '../controllers/rolePermissionController.js';

const router = express.Router();

router.get('/', getRolePermissions);
router.get('/:roleId/:permissionId', getRolePermission);
router.post('/', addRolePermission);
router.delete('/:roleId/:permissionId', removeRolePermission);

export default router;
