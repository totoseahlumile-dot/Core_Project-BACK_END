import express from 'express';
import {
  getRoles,
  getRole,
  addRole,
  editRole,
  removeRole,
} from '../controllers/roleController.js';

const router = express.Router();

router.get('/', getRoles);
router.get('/:id', getRole);
router.post('/', addRole);
router.put('/:id', editRole);
router.delete('/:id', removeRole);

export default router;

