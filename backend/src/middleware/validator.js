import { ERROR_CODES, MESSAGES } from '../utils/constants.js';

export function validateContactForm(req, res, next) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(ERROR_CODES.BAD_REQUEST).json({
      success: false,
      error: {
        status: ERROR_CODES.BAD_REQUEST,
        message: 'Name, email, and message are required',
      },
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(ERROR_CODES.BAD_REQUEST).json({
      success: false,
      error: {
        status: ERROR_CODES.BAD_REQUEST,
        message: 'Invalid email format',
      },
    });
  }

  next();
}

export function validateProjectInput(req, res, next) {
  const { title, description, tags } = req.body;

  if (!title || !description) {
    return res.status(ERROR_CODES.BAD_REQUEST).json({
      success: false,
      error: {
        status: ERROR_CODES.BAD_REQUEST,
        message: 'Title and description are required',
      },
    });
  }

  next();
}

export default { validateContactForm, validateProjectInput };
