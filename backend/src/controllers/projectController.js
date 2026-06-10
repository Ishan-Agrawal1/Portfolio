import ProjectModel from '../models/Project.js';
import { MESSAGES, ERROR_CODES } from '../utils/constants.js';
import { logger } from '../utils/logger.js';

const sampleProjects = [
  {
    title: 'High-Frequency Trading Engine',
    description: 'A low-latency trading system designed to process market data feeds and execute orders within microsecond tolerances. Utilized lock-free data structures and custom memory allocators to bypass OS kernel overhead.',
    tags: ['ALGORITHMS', 'C++'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Distributed Consensus Protocol',
    description: 'Implementation of a novel consensus algorithm optimized for high-throughput, geo-distributed networks with Byzantine fault tolerance.',
    tags: ['DISTRIBUTED', 'GO'],
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop',
  },
];

export async function getAllProjects(req, res, next) {
  try {
    const projects = await ProjectModel.getAll();
    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS,
      data: projects.length > 0 ? projects : sampleProjects,
    });
  } catch (error) {
    logger.error('Failed to fetch projects', { error: error.message });
    res.status(200).json({
      success: true,
      message: 'Serving fallback projects due to an error.',
      data: sampleProjects,
    });
  }
}

export async function getProjectById(req, res, next) {
  try {
    const { id } = req.params;
    const project = await ProjectModel.getById(id);
    
    if (!project) {
      const err = new Error(MESSAGES.NOT_FOUND);
      err.status = ERROR_CODES.NOT_FOUND;
      return next(err);
    }
    
    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS,
      data: project,
    });
  } catch (error) {
    logger.error('Failed to fetch project', { error: error.message });
    const err = new Error('Failed to fetch project');
    err.status = ERROR_CODES.INTERNAL_ERROR;
    next(err);
  }
}

export async function createProject(req, res, next) {
  try {
    const project = await ProjectModel.create(req.body);
    res.status(201).json({
      success: true,
      message: MESSAGES.CREATED,
      data: project,
    });
  } catch (error) {
    logger.error('Failed to create project', { error: error.message });
    const err = new Error('Failed to create project');
    err.status = ERROR_CODES.INTERNAL_ERROR;
    next(err);
  }
}

export async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    const project = await ProjectModel.update(id, req.body);
    
    if (!project) {
      const err = new Error(MESSAGES.NOT_FOUND);
      err.status = ERROR_CODES.NOT_FOUND;
      return next(err);
    }
    
    res.status(200).json({
      success: true,
      message: MESSAGES.UPDATED,
      data: project,
    });
  } catch (error) {
    logger.error('Failed to update project', { error: error.message });
    const err = new Error('Failed to update project');
    err.status = ERROR_CODES.INTERNAL_ERROR;
    next(err);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    await ProjectModel.delete(id);
    
    res.status(200).json({
      success: true,
      message: MESSAGES.DELETED,
      data: { id },
    });
  } catch (error) {
    logger.error('Failed to delete project', { error: error.message });
    const err = new Error('Failed to delete project');
    err.status = ERROR_CODES.INTERNAL_ERROR;
    next(err);
  }
}

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
