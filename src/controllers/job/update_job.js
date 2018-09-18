import mongoose from 'mongoose';
import JobModel from '../../models/job';
import { errorResponseWithStatus } from '../../utils/Helpers';

export default (req, res) => {

  const errors = [];
  if (Object.keys(req.body).length > 1 && req.body.job_id) {

    if (!mongoose.Types.ObjectId.isValid(req.body.job_id)) {
      return errorResponseWithStatus(res, 404, 'Invalid job_id');
    }

    Object.keys(req.body).map(field => {

      switch (field) {
        case 'comapany_id':
          if (!mongoose.Types.ObjectId.isValid(req.body[field])) {
            const error = { status: 404, details: 'Company ID is not valid' };
            errors.push(error);
          };
        break;

        case 'technologies':
          if (!Array.isArray(req.body[field])) {
            const error = { status: 404, details: 'Technologies should be an array' };
            return errors.push(error);
          }

          if (req.body[field].length === 0) {
            const error = { status: 404, details: ' At least, one technology should be selected' };
            errors.push(error);
          }
        break;

        default:
          if (!req.body[field] || typeof req.body[field] !== "string") {
            const error = { status: 404, details: `${field} is not a valid string` };
            errors.push(error);
          }
      }
    });
  } else {
    return errorResponseWithStatus(res, 404, "Cannot update job posting with empty data or invalid ID");
  }

  if (errors.length === 0) {
    const updateOBj = {...req.body};
    // once comapny registration has been set up. Validation will be done on the company updating it
    JobModel.findByIdAndUpdate(req.body.job_id, updateOBj, { new: true }, (err, newJobInfo) => {
      if (err) {
        return errorResponseWithStatus(res, 500, 'Job update failed');
      }

      if(!newJobInfo) {
        return errorResponseWithStatus(res, 500, 'Job ID is missing in DB');
      }

      const payload = {};
      payload.data = { status: 200, info: newJobInfo }
      res.status(200).json(payload);
    })
  } else {
    const payload = { error: errors };
    res.status(404).json(payload);
  }
};
