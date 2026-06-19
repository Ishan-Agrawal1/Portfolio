import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

/**
 * Middleware to verify JWT token from Authorization header.
 * Expects: Authorization: Bearer <token>
 */
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        status: 401,
        message: 'Access denied. No token provided.',
      },
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: {
        status: 403,
        message: 'Invalid or expired token.',
      },
    });
  }
}

export default verifyToken;
