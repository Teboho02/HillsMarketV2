import express from 'express';
import { signup, login, logout, getCurrentUser } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateToken, getCurrentUser);

export default router;
