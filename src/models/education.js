import mongoose,{ Schema } from 'mongoose';

const EducationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  institution_name: {
    type: String,
    required: true
  },
  institution_location: {
    type: String,
    required: true
  },
  certificate_type: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
});

export default mongoose.model('Education', EducationSchema);
