import mongoose,{ Schema } from 'mongoose';

const WorkHistorySchema = new Schema({
	user_id: { 
		type: Schema.Types.ObjectId,
		required: true 
	},
	company_name: { 
		type: String, 
		required: true 
	},
	company_website: {
		type: String, 
		required: true 
	},
	company_icon: {
		type: String, 
		required: true 
	},
	start_date: {
		type: Date, 
		default: Date.now
	},
	end_date: { 
		type: Date, 
		default: Date.now 
	},
	job_description: { 
		type: String, 
		required: true 
	}
});

export default mongoose.model('work_history', WorkHistorySchema);
