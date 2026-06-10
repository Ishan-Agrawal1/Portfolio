import ContactModel from '../models/Contact.js';
import { MESSAGES, ERROR_CODES } from '../utils/constants.js';
import { logger } from '../utils/logger.js';

export async function submitContact(req, res, next) {
  try {
    const contact = await ContactModel.create(req.body);
    logger.info('Contact form submitted', { contactId: contact.id, email: contact.email });
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    });
  } catch (error) {
    logger.error('Failed to submit contact form', { error: error.message });
    const err = new Error('Failed to submit contact form');
    err.status = ERROR_CODES.INTERNAL_ERROR;
    next(err);
  }
}

export async function getAllContacts(req, res, next) {
  try {
    const contacts = await ContactModel.getAll();
    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS,
      data: contacts,
    });
  } catch (error) {
    logger.error('Failed to fetch contacts', { error: error.message });
    const err = new Error('Failed to fetch contacts');
    err.status = ERROR_CODES.INTERNAL_ERROR;
    next(err);
  }
}

export async function getContactById(req, res, next) {
  try {
    const { id } = req.params;
    const contact = await ContactModel.getById(id);
    
    if (!contact) {
      const err = new Error(MESSAGES.NOT_FOUND);
      err.status = ERROR_CODES.NOT_FOUND;
      return next(err);
    }
    
    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS,
      data: contact,
    });
  } catch (error) {
    logger.error('Failed to fetch contact', { error: error.message });
    const err = new Error('Failed to fetch contact');
    err.status = ERROR_CODES.INTERNAL_ERROR;
    next(err);
  }
}

export async function markContactAsRead(req, res, next) {
  try {
    const { id } = req.params;
    const contact = await ContactModel.markAsRead(id);
    
    if (!contact) {
      const err = new Error(MESSAGES.NOT_FOUND);
      err.status = ERROR_CODES.NOT_FOUND;
      return next(err);
    }
    
    res.status(200).json({
      success: true,
      message: MESSAGES.UPDATED,
      data: contact,
    });
  } catch (error) {
    logger.error('Failed to update contact', { error: error.message });
    const err = new Error('Failed to update contact');
    err.status = ERROR_CODES.INTERNAL_ERROR;
    next(err);
  }
}

export default {
  submitContact,
  getAllContacts,
  getContactById,
  markContactAsRead,
};
