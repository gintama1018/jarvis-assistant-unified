import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  authUid: { type: String, index: true },
  email: String,
  name: String,
  preferences: {
    ttsVoice: String,
    wakeWord: String,
    timezone: { type: String, default: 'Asia/Kolkata' }
  }
}, { timestamps: true });
export default mongoose.model('User', UserSchema);
