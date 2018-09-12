import mongoose,{ Schema } from 'mongoose';

const ApplicationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  application_title: {
    type: String,
    required: true
  },
  skills: [
    {
      type: Schema.Types.ObjectId
    }
  ],
  education_history: [
    {
      type: Schema.Types.ObjectId
    }
  ],
});

export default mongoose.model('Application', ApplicationSchema);
