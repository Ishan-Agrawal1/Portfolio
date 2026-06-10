import express from 'express';
import * as contactController from '../controllers/contactController.js';
import { validateContactForm } from '../middleware/validator.js';

const router = express.Router();

router.post('/', validateContactForm, contactController.submitContact);
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.patch('/:id/mark-read', contactController.markContactAsRead);

export default router;
