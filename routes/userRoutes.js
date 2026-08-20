import express from 'express';
import {
  getUsers,
  getUser,
  addUser,
  editUser,
  removeUser,
} from '../controllers/userController.js';
import { validateId, validateUser } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', validateId, getUser);
router.post('/', validateUser, addUser);
router.put('/:id', validateId, validateUser, editUser);
router.delete('/:id', validateId, removeUser);

export default router;