import { db } from '../config/firebase.js';
import { COLLECTIONS } from '../utils/constants.js';

class ContactModel {
  static async create(contactData) {
    const docRef = await db
      .collection(COLLECTIONS.CONTACTS)
      .add({
        ...contactData,
        createdAt: new Date(),
        read: false,
      });
    
    return { id: docRef.id, ...contactData };
  }

  static async getAll() {
    const snapshot = await db
      .collection(COLLECTIONS.CONTACTS)
      .orderBy('createdAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  static async getById(id) {
    const doc = await db
      .collection(COLLECTIONS.CONTACTS)
      .doc(id)
      .get();
    
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  static async markAsRead(id) {
    await db
      .collection(COLLECTIONS.CONTACTS)
      .doc(id)
      .update({ read: true });
    
    return this.getById(id);
  }

  static async delete(id) {
    await db
      .collection(COLLECTIONS.CONTACTS)
      .doc(id)
      .delete();
    
    return { id };
  }
}

export default ContactModel;
