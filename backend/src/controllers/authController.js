import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@portfolio.dev';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

/**
 * POST /api/auth/login
 * Validate credentials against env vars and return a JWT.
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          status: 400,
          message: 'Email and password are required.',
        },
      });
    }

    // Check against env-defined admin credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      logger.warn('Failed login attempt', { email });
      return res.status(401).json({
        success: false,
        error: {
          status: 401,
          message: 'Invalid credentials.',
        },
      });
    }

    // Generate JWT (expires in 24h)
    const token = jwt.sign(
      { email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    logger.info('Admin login successful', { email });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: { token },
    });
  } catch (error) {
    logger.error('Login error', { error: error.message });
    res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: 'Internal server error.',
      },
    });
  }
}

/**
 * GET /api/auth/verify
 * Check if the current token is still valid.
 */
export async function verifyAuth(req, res) {
  // If we reach here, the verifyToken middleware already validated the token
  res.status(200).json({
    success: true,
    message: 'Token is valid.',
    data: { admin: req.admin },
  });
}

export default { login, verifyAuth };
