// Firestore Collection Names
export const COLLECTIONS = {
  PROJECTS: 'projects',
  CONTACTS: 'contacts',
};

// API Response Messages
export const MESSAGES = {
  SUCCESS: 'Success',
  ERROR: 'Error',
  NOT_FOUND: 'Not found',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
};

// Error Codes
export const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export default { COLLECTIONS, MESSAGES, ERROR_CODES };
