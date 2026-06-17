import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

class ProjectModel {
  static async getAll() {
    const docs = await Project.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc) => ({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      tags: doc.tags,
      imageUrl: doc.imageUrl,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  }

  static async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const doc = await Project.findById(id).lean();
    if (!doc) return null;
    return { id: doc._id.toString(), ...doc, _id: undefined };
  }

  static async create(projectData) {
    const doc = await Project.create(projectData);
    return { id: doc._id.toString(), ...doc.toObject(), _id: undefined };
  }

  static async update(id, projectData) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const doc = await Project.findByIdAndUpdate(
      id,
      { ...projectData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();
    if (!doc) return null;
    return { id: doc._id.toString(), ...doc, _id: undefined };
  }

  static async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    await Project.findByIdAndDelete(id);
    return { id };
  }
}

export default ProjectModel;
