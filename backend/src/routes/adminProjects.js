import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/adminProjectController.js';

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Multer fields for video + thumbnail
const projectUpload = upload.fields([
  { name: 'demoVideoFile', maxCount: 1 },
  { name: 'thumbnailFile', maxCount: 1 },
]);

// CRUD routes
router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', projectUpload, createProject);
router.put('/:id', projectUpload, updateProject);
router.delete('/:id', deleteProject);

export default router;
