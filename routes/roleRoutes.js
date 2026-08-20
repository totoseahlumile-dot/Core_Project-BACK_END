import express from 'express';
import {
  getRoles,
  getRole,
  addRole,
  editRole,
  removeRole,
} from '../controllers/roleController.js';
import { validateId, validateRole } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getRoles);
router.get('/:id', validateId, getRole);
router.post('/', validateRole, addRole);
router.put('/:id', validateId, validateRole, editRole);
router.delete('/:id', validateId, removeRole);

export default router;