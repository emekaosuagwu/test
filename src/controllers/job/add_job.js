import mongoose from 'mongoose';
import JobModel from '../../models/job';
import { errorResponseWithStatus } from '../../utils/Helpers';

export default (req, res) => {

  const errors = [];

  const {
    job_title,
    comapany_id,
    technologies,
    job_description,
    minimum_requirement,
  } = req.body;

  const jobInfoObj = {
    job_title,
    comapany_id,
    technologies,
    job_description,
    minimum_requirement,
  };

  Object.keys(jobInfoObj).map(field => {

    if (field === 'comapany_id') {
      if (!mongoose.Types.ObjectId.isValid(jobInfoObj[field])) {
        const error = { status: 404, details: 'Company ID is not valid' };
        errors.push(error);
      }
    };

    if (field === 'technologies') {

      if (!Array.isArray(jobInfoObj[field])) {
        const error = { status: 404, details: 'Technologies should be an array' };
        return errors.push(error);
      }

      if ( jobInfoObj[field].length === 0) {
        const error = { status: 404, details: ' At least, one technology should be selected' };
        errors.push(error);
      }
    };

    if (field !== 'technologies' && field !== 'comapany_id') {
      if (!jobInfoObj[field] || typeof jobInfoObj[field] !== "string") {
        const error = { status: 404, details: `${field} is not a valid string` };
        errors.push(error);
      }
    };

  });

  if (errors.length === 0) {
    const Job = new JobModel({...jobInfoObj});
    Portfolio.save((err,  jobInfo) => {
      if (err) {
        return errorResponseWithStatus(res, 500, 'Error, cannot save job posting');
      }

      const payload = {};
      payload.data = { success: true, message: 'Job posting saved successfully' };
      res.status(200).json(payload);
    })
  } else {
    const payload = { error: errors };
    res.status(404).json(payload);
  }
}
