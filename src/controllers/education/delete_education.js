import mongoose from 'mongoose';
import { errorResponseWithStatus } from '../../utils/Helpers';
import EducationModel from '../../models/education';

export default (req, res) => {
  const { edu_id } = req.body;

  if(!edu_id || !mongoose.Types.ObjectId.isValid(edu_id)) {
    return errorResponseWithStatus(res, 404, 'Invalid Education ID');
  }

  EducationModel.findById(edu_id, (err, eduHistory) => {
    if (err) {
      return errorResponseWithStatus(res, 500, 'Delete operation failed');
    }

    if (!eduHistory) {
      return errorResponseWithStatus(res, 404, 'Cannot find education info with that ID');
    }

    if (eduHistory.user_id != res.locals.userID) {
      return errorResponseWithStatus(res, 404, '!You are not authorized to delete this education history');
    }

    EducationModel.findByIdAndRemove(edu_id, (err, deletedEdu) => {

      if(err) {
        return errorResponseWithStatus(res, 500, 'Delete operation failed');
      }

      if(!deletedEdu) {
        return errorResponseWithStatus(res, 404, 'Cannot find education info with that ID');
      }

      const payload = {};
      payload.data = { success: true, message: 'Education info deleted successfully' };
      res.status(200).json(payload);
    })
  })
}