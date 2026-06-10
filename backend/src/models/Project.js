import { db } from '../config/firebase.js';
import { COLLECTIONS } from '../utils/constants.js';

class ProjectModel {
  static async getAll() {
    const snapshot = await db
      .collection(COLLECTIONS.PROJECTS)
      .orderBy('createdAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  static async getById(id) {
    const doc = await db
      .collection(COLLECTIONS.PROJECTS)
      .doc(id)
      .get();
    
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  static async create(projectData) {
    const docRef = await db
      .collection(COLLECTIONS.PROJECTS)
      .add({
        ...projectData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    
    return { id: docRef.id, ...projectData };
  }

  static async update(id, projectData) {
    await db
      .collection(COLLECTIONS.PROJECTS)
      .doc(id)
      .update({
        ...projectData,
        updatedAt: new Date(),
      });
    
    return this.getById(id);
  }

  static async delete(id) {
    await db
      .collection(COLLECTIONS.PROJECTS)
      .doc(id)
      .delete();
    
    return { id };
  }
}

export default ProjectModel;
