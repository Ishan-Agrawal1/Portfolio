const LogLevel = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  WARN: 'WARN',
  DEBUG: 'DEBUG',
};

function formatLog(level, message, data = {}) {
  const timestamp = new Date().toISOString();
  return JSON.stringify({
    timestamp,
    level,
    message,
    ...data,
  });
}

export const logger = {
  info: (message, data) => console.log(formatLog(LogLevel.INFO, message, data)),
  error: (message, data) => console.error(formatLog(LogLevel.ERROR, message, data)),
  warn: (message, data) => console.warn(formatLog(LogLevel.WARN, message, data)),
  debug: (message, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(formatLog(LogLevel.DEBUG, message, data));
    }
  },
};

export default logger;
