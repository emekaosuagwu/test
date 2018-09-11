import mongoose from 'mongoose';
import WorkHistoryModel from '../../models/education';
import { errorResponseWithStatus } from '../../utils/Helpers';

export default (req, res) => {

const errors = [];

	if (Object.keys(req.body).length > 1 && req.body.work_history) {

		if (!mongoose.Types.ObjectId.isValid(req.body.work_history)) {
			return errorResponseWithStatus(res, 404, 'Inavlid work_history');
		}

		Object.keys(req.body).map(field => {
			if (field) {

				if (field === 'end_date' || field === 'start_date') {
					const dateValue = moment(eduInfoObj[field]);
				
					if (dateValue.isValid() !== false) {
						const error = { status: 404, details: `${field} is not valid` };
						errors.push(error);
					}
				} 
				else {
					if (typeof field !== 'string' ) {
						const error = { status: 404, details: `${field} is not a valid string` };
						errors.push(error);
					}
				}
			};
		});
	} 
	else {
		return errorResponseWithStatus(res, 404, "Cannot update education history with empty data or invalid ID");
	}

	if (errors.length === 0) {
		
		const updateOBj = {...req.body};
		
		updateOBj.user_id = res.locals.userID;
		
		WorkHistoryModel.findByIdAndUpdate(req.body.work_history, updateOBj, { new: true }, (err, newEduInfo) => {
		
			if (err) {
				return errorResponseWithStatus(res, 500, 'Education info update failed');
			}

			if(!newEduInfo) {
				return errorResponseWithStatus(res, 500, 'Education ID is missing in DB');
			}

			const payload = {};
			payload.data = { status: 200, info: newEduInfo }
			res.status(200).json(payload);
		})
	} 
	else {
		const payload = { error: errors };
		res.status(404).json(payload);
	}
};