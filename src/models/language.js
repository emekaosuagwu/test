import mongoose, { Schema } from 'mongoose';

const LanguageSchema = new Schema({
  language_name: { type: String, required: true, unique: true },
  language_code: { type: String, required: true, unique: true }
});

export default mongoose.model('Language', LanguageSchema);