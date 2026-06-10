import { ERROR_CODES, MESSAGES } from '../utils/constants.js';
import { logger } from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  const status = err.status || ERROR_CODES.INTERNAL_ERROR;
  const message = err.message || MESSAGES.ERROR;

  logger.error('Error occurred', {
    status,
    message,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  res.status(status).json({
    success: false,
    error: {
      status,
      message,
    },
  });
}

export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default errorHandler;
