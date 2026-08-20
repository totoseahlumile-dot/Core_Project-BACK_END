import express from 'express';
import { login, register, logout, getCurrentUser } from '../controllers/authController.js';
import { validateLogin, validateRegister } from '../middleware/validators.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.post('/logout', logout);
router.get('/me', authenticateToken, getCurrentUser);

export default router;