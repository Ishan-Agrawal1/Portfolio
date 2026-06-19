import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { logger } from '../utils/logger.js';

// Lazy-configure Cloudinary (env vars may not be loaded at import time)
let configured = false;
function ensureConfigured() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    configured = true;
    logger.info('Cloudinary configured', { cloud_name: process.env.CLOUDINARY_CLOUD_NAME });
  }
}

/**
 * Upload a file to Cloudinary.
 * @param {string} filePath - Local file path to upload
 * @param {object} options - Upload options
 * @param {string} options.resourceType - 'video' | 'image' (default: 'video')
 * @param {string} options.folder - Cloudinary folder (default: 'portfolio/projects')
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadToCloudinary(filePath, options = {}) {
  ensureConfigured();
  const { resourceType = 'video', folder = 'portfolio/projects' } = options;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: resourceType,
      folder,
    });

    logger.info(`Uploaded ${resourceType} to Cloudinary`, {
      publicId: result.public_id,
      url: result.secure_url,
    });

    // Delete local file after successful upload
    fs.unlink(filePath, (err) => {
      if (err) logger.warn('Failed to delete local file', { filePath, error: err.message });
      else logger.debug('Deleted local file', { filePath });
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    // Clean up local file even on error
    fs.unlink(filePath, () => {});
    logger.error(`Failed to upload ${resourceType} to Cloudinary`, { error: error.message });
    throw error;
  }
}

/**
 * Delete an asset from Cloudinary by its public ID.
 * @param {string} publicId - Cloudinary public ID
 * @param {string} resourceType - 'video' | 'image' (default: 'video')
 */
export async function deleteFromCloudinary(publicId, resourceType = 'video') {
  ensureConfigured();
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    logger.info(`Deleted ${resourceType} from Cloudinary`, { publicId, result: result.result });
    return result;
  } catch (error) {
    logger.error(`Failed to delete ${resourceType} from Cloudinary`, {
      publicId,
      error: error.message,
    });
    throw error;
  }
}

export default { uploadToCloudinary, deleteFromCloudinary };
