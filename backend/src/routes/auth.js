import express from 'express';
import { login, verifyAuth } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public: Login
router.post('/login', login);

// Protected: Verify token validity
router.get('/verify', verifyToken, verifyAuth);

export default router;
