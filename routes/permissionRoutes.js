import express from 'express';
import {
  getPermissions,
  getPermission,
  addPermission,
  editPermission,
  removePermission,
} from '../controllers/permissionController.js';

const router = express.Router();

router.get('/', getPermissions);
router.get('/:id', getPermission);
router.post('/', addPermission);
router.put('/:id', editPermission);
router.delete('/:id', removePermission);

export default router;
