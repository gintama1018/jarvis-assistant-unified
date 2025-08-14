import mongoose from 'mongoose';
const NoteSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  title: String,
  content: String,
  tags: [String],
  attachments: [{ name: String, url: String, type: String }]
}, { timestamps: true });
export default mongoose.model('Note', NoteSchema);
