import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  fullDescription: String,
  thumbnail: String,
  demoVideo: String,
  githubUrl: String,
  liveUrl: String,
  techStack: [String],
  features: [String],
  category: {
    type: String,
    enum: [
      "Full Stack",
      "Frontend",
      "Backend",
      "Mobile",
      "Blockchain"
    ]
  },

  featured: {
    type: Boolean,
    default: false
  },

  
},{ timestamps: true });

const Project = mongoose.model('Project', projectSchema);

class ProjectModel {
  static async getAll() {
    const docs = await Project.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc) => ({
      id: doc._id.toString(),
      ...doc,
      _id: undefined,
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
