import mongoose from 'mongoose';
const ClassSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  title: String,
  dayOfWeek: Number,
  startTime: String,
  endTime: String,
  location: String,
  teacher: String
}, { timestamps: true });
export default mongoose.model('Class', ClassSchema);
