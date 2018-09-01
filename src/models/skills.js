import mongoose,{ Schema } from 'mongoose';

const SkillSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, required: true },
  skill_name: { type: String, required: true },
  years_of_experience: { type: Number, required: true },
});

export default mongoose.model('Skills', SkillSchema);