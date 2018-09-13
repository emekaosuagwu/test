import mongoose from 'mongoose';
import WorkHistoryModel from '../../models/work_history';
import { errorResponseWithStatus } from '../../utils/Helpers';

export default (req, res) => {

	const { work_history_id } = req.body;

	/**
	 * [if checking if ]
	 * @param  {String} !req.headers.authorization || req.headers.authorization.split(' ')[0] ! [description]
	 * @return {[type]} [description]
	 */
	if (!req.headers.authorization || req.headers.authorization.split(' ')[0] != 'Bearer') {
		return errorResponseWithStatus(res, 500, 'Invalid Header. Auth Bearer is needed to identify user');
	}

	if(!work_history_id || !mongoose.Types.ObjectId.isValid(work_history_id)) {
		return errorResponseWithStatus(res, 404, 'Inavlid Work History ID');
	}

	WorkHistoryModel.findById(work_history_id, (err, work_history) => {

    if (err) {
			return errorResponseWithStatus(res, 404, 'Delete operation failed');
		}

    if (!work_history) {
			return errorResponseWithStatus(res, 404, 'Cannot find work history info with that ID');
		}

		if (res.locals.userID != work_history.user_id)
		{
			return errorResponseWithStatus(res, 500, `User don't have access to delete work history`);
    }

    WorkHistoryModel.findByIdAndRemove(work_history_id, (err, delete_work_history) => {

      if(err) {
        return errorResponseWithStatus(res, 500, 'Delete operation failed');
      }

      if(!delete_work_history) {
        return errorResponseWithStatus(res, 404, 'Cannot find work history info with that ID');
      }

      const payload = {};

      payload.data = { success: true, message: 'Work History info deleted successfully' };
      res.status(200).json(payload);

		const payload = {};
		
		payload.data = { success: true, message: 'Work History info deleted successfully' };
		res.status(200).json(payload);
	})
} 
  
