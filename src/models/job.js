import mongoose, { Schema } from 'mongoose';

const JobSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'Company', required: true
  },
	job_title: {
    type: String,
    required: true
  },
	job_description: {
    type: String,
    required: true
  },
	technologies: [
    {
      type: String,
      required: true
    }
  ],
  minimum_requirement: {
    type: String,
    required: true
  },
});

export default mongoose.model('Job', JobSchema);