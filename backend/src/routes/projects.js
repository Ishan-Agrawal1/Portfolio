import express from 'express';
import * as projectController from '../controllers/projectController.js';
import { validateProjectInput } from '../middleware/validator.js';

const router = express.Router();

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', validateProjectInput, projectController.createProject);
router.put('/:id', validateProjectInput, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export default router;
