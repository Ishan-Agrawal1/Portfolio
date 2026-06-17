import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

class ContactModel {
  static async create(contactData) {
    const doc = await Contact.create({
      ...contactData,
      read: false,
    });
    return { id: doc._id.toString(), ...doc.toObject(), _id: undefined };
  }

  static async getAll() {
    const docs = await Contact.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc) => ({
      id: doc._id.toString(),
      ...doc,
      _id: undefined,
    }));
  }

  static async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const doc = await Contact.findById(id).lean();
    if (!doc) return null;
    return { id: doc._id.toString(), ...doc, _id: undefined };
  }

  static async markAsRead(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const doc = await Contact.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    ).lean();
    if (!doc) return null;
    return { id: doc._id.toString(), ...doc, _id: undefined };
  }

  static async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    await Contact.findByIdAndDelete(id);
    return { id };
  }
}

export default ContactModel;
