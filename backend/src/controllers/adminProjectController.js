import ProjectModel from '../models/Project.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { MESSAGES, ERROR_CODES } from '../utils/constants.js';
import { logger } from '../utils/logger.js';

/**
 * Extract Cloudinary public ID from a secure URL.
 * e.g. "https://res.cloudinary.com/xxx/video/upload/v123/portfolio/projects/file.mp4"
 *  → "portfolio/projects/file"
 */
function extractPublicId(url, resourceType = 'video') {
  if (!url) return null;
  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;
    // Remove version prefix (v123456/) and file extension
    const afterUpload = parts[1].replace(/^v\d+\//, '');
    const publicId = afterUpload.replace(/\.[^.]+$/, '');
    return publicId;
  } catch {
    return null;
  }
}

/**
 * GET /api/admin/projects
 * List all projects for the admin table.
 */
export async function listProjects(req, res) {
  try {
    const projects = await ProjectModel.getAll();
    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS,
      data: projects,
    });
  } catch (error) {
    logger.error('Admin: Failed to list projects', { error: error.message });
    res.status(500).json({
      success: false,
      error: { status: 500, message: 'Failed to fetch projects.' },
    });
  }
}

/**
 * GET /api/admin/projects/:id
 * Get a single project for the edit form.
 */
export async function getProject(req, res) {
  try {
    const project = await ProjectModel.getById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: { status: 404, message: MESSAGES.NOT_FOUND },
      });
    }
    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS,
      data: project,
    });
  } catch (error) {
    logger.error('Admin: Failed to get project', { error: error.message });
    res.status(500).json({
      success: false,
      error: { status: 500, message: 'Failed to fetch project.' },
    });
  }
}

/**
 * POST /api/admin/projects
 * Create a new project. Accepts multipart form data with optional video + thumbnail files.
 *
 * Form fields: title, shortDescription, fullDescription, thumbnail, demoVideo,
 *              githubUrl, liveUrl, techStack (comma-separated), features (comma-separated),
 *              category, featured
 * File fields: demoVideoFile (video), thumbnailFile (image)
 */
export async function createProject(req, res) {
  try {
    const projectData = parseFormFields(req.body);

    logger.info('Admin: Create project request', {
      body: Object.keys(req.body),
      files: req.files ? Object.keys(req.files) : 'none',
    });

    // Handle video upload
    if (req.files?.demoVideoFile?.[0]) {
      const videoFile = req.files.demoVideoFile[0];
      logger.info('Uploading demo video to Cloudinary', {
        filename: videoFile.originalname,
        path: videoFile.path,
        size: videoFile.size,
        mimetype: videoFile.mimetype,
      });
      const videoResult = await uploadToCloudinary(videoFile.path, {
        resourceType: 'video',
        folder: 'portfolio/projects/videos',
      });
      projectData.demoVideo = videoResult.url;
    }

    // Handle thumbnail upload
    if (req.files?.thumbnailFile?.[0]) {
      const thumbnailFile = req.files.thumbnailFile[0];
      logger.info('Uploading thumbnail to Cloudinary', {
        filename: thumbnailFile.originalname,
        path: thumbnailFile.path,
        size: thumbnailFile.size,
        mimetype: thumbnailFile.mimetype,
      });
      const thumbResult = await uploadToCloudinary(thumbnailFile.path, {
        resourceType: 'image',
        folder: 'portfolio/projects/thumbnails',
      });
      projectData.thumbnail = thumbResult.url;
    }

    const project = await ProjectModel.create(projectData);

    logger.info('Admin: Project created', { id: project.id, title: project.title });

    res.status(201).json({
      success: true,
      message: MESSAGES.CREATED,
      data: project,
    });
  } catch (error) {
    logger.error('Admin: Failed to create project', {
      error: error.message,
      stack: error.stack,
      httpCode: error.http_code,
    });
    res.status(500).json({
      success: false,
      error: { status: 500, message: error.message || 'Failed to create project.' },
    });
  }
}

/**
 * PUT /api/admin/projects/:id
 * Update an existing project. If new video/thumbnail files are provided,
 * the old ones are deleted from Cloudinary.
 */
export async function updateProject(req, res) {
  try {
    const { id } = req.params;

    // Fetch existing project to get old file URLs
    const existing = await ProjectModel.getById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { status: 404, message: MESSAGES.NOT_FOUND },
      });
    }

    const projectData = parseFormFields(req.body);

    // Handle video re-upload
    if (req.files?.demoVideoFile?.[0]) {
      const videoFile = req.files.demoVideoFile[0];
      logger.info('Re-uploading demo video to Cloudinary', { filename: videoFile.originalname });

      // Upload new video
      const videoResult = await uploadToCloudinary(videoFile.path, {
        resourceType: 'video',
        folder: 'portfolio/projects/videos',
      });
      projectData.demoVideo = videoResult.url;

      // Delete old video from Cloudinary
      if (existing.demoVideo) {
        const oldPublicId = extractPublicId(existing.demoVideo, 'video');
        if (oldPublicId) {
          deleteFromCloudinary(oldPublicId, 'video').catch((err) =>
            logger.warn('Failed to delete old video', { error: err.message })
          );
        }
      }
    }

    // Handle thumbnail re-upload
    if (req.files?.thumbnailFile?.[0]) {
      const thumbnailFile = req.files.thumbnailFile[0];
      logger.info('Re-uploading thumbnail to Cloudinary', { filename: thumbnailFile.originalname });

      const thumbResult = await uploadToCloudinary(thumbnailFile.path, {
        resourceType: 'image',
        folder: 'portfolio/projects/thumbnails',
      });
      projectData.thumbnail = thumbResult.url;

      // Delete old thumbnail from Cloudinary
      if (existing.thumbnail) {
        const oldPublicId = extractPublicId(existing.thumbnail, 'image');
        if (oldPublicId) {
          deleteFromCloudinary(oldPublicId, 'image').catch((err) =>
            logger.warn('Failed to delete old thumbnail', { error: err.message })
          );
        }
      }
    }

    const project = await ProjectModel.update(id, projectData);

    logger.info('Admin: Project updated', { id, title: project.title });

    res.status(200).json({
      success: true,
      message: MESSAGES.UPDATED,
      data: project,
    });
  } catch (error) {
    logger.error('Admin: Failed to update project', { error: error.message });
    res.status(500).json({
      success: false,
      error: { status: 500, message: 'Failed to update project.' },
    });
  }
}

/**
 * DELETE /api/admin/projects/:id
 * Delete a project and its associated Cloudinary assets.
 */
export async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    // Fetch project to get file URLs before deleting
    const existing = await ProjectModel.getById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { status: 404, message: MESSAGES.NOT_FOUND },
      });
    }

    // Delete from MongoDB
    await ProjectModel.delete(id);

    // Delete video from Cloudinary
    if (existing.demoVideo) {
      const videoPublicId = extractPublicId(existing.demoVideo, 'video');
      if (videoPublicId) {
        deleteFromCloudinary(videoPublicId, 'video').catch((err) =>
          logger.warn('Failed to delete video from Cloudinary', { error: err.message })
        );
      }
    }

    // Delete thumbnail from Cloudinary
    if (existing.thumbnail) {
      const thumbPublicId = extractPublicId(existing.thumbnail, 'image');
      if (thumbPublicId) {
        deleteFromCloudinary(thumbPublicId, 'image').catch((err) =>
          logger.warn('Failed to delete thumbnail from Cloudinary', { error: err.message })
        );
      }
    }

    logger.info('Admin: Project deleted', { id, title: existing.title });

    res.status(200).json({
      success: true,
      message: MESSAGES.DELETED,
      data: { id },
    });
  } catch (error) {
    logger.error('Admin: Failed to delete project', { error: error.message });
    res.status(500).json({
      success: false,
      error: { status: 500, message: 'Failed to delete project.' },
    });
  }
}

/**
 * Parse multipart form fields into a clean project data object.
 * Handles comma-separated arrays for techStack and features.
 */
function parseFormFields(body) {
  const data = {};

  if (body.title) data.title = body.title;
  if (body.shortDescription) data.shortDescription = body.shortDescription;
  if (body.fullDescription) data.fullDescription = body.fullDescription;
  if (body.githubUrl) data.githubUrl = body.githubUrl;
  if (body.liveUrl) data.liveUrl = body.liveUrl;
  if (body.category) data.category = body.category;
  if (body.thumbnail) data.thumbnail = body.thumbnail;
  if (body.demoVideo) data.demoVideo = body.demoVideo;

  // featured is a string 'true'/'false' from form data
  if (body.featured !== undefined) {
    data.featured = body.featured === 'true' || body.featured === true;
  }

  // Parse comma-separated arrays
  if (body.techStack) {
    data.techStack = typeof body.techStack === 'string'
      ? body.techStack.split(',').map((s) => s.trim()).filter(Boolean)
      : body.techStack;
  }

  if (body.features) {
    data.features = typeof body.features === 'string'
      ? body.features.split(',').map((s) => s.trim()).filter(Boolean)
      : body.features;
  }

  return data;
}

export default {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
