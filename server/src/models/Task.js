import mongoose from 'mongoose';
const TaskSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  title: String,
  dueAt: Date,
  status: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
  courseRef: String,
  priority: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model('Task', TaskSchema);
