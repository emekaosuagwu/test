import mongoose from 'mongoose';
import WorkHistoryModel from '../../models/work_history';
import { errorResponseWithStatus } from '../../utils/Helpers';

export default (req, res) => {

	const { work_history_id } = req.body;

	if(!work_history_id || !mongoose.Types.ObjectId.isValid(work_history_id)) {
		return errorResponseWithStatus(res, 404, 'Inavlid Work History ID');
	}

	WorkHistoryModel.findByIdAndRemove(work_history_id, (err, deletedEdu) => {

		if(err) {
			return errorResponseWithStatus(res, 500, 'Delete operation failed');
		}

		if(!deletedEdu) {
			return errorResponseWithStatus(res, 404, 'Cannot find work history info with that ID');
		}

		const payload = {};
		
		payload.data = { success: true, message: 'Work History info deleted successfully' };
		res.status(200).json(payload);
	
	})
} 