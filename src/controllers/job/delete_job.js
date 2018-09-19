import mongoose from 'mongoose';
import { errorResponseWithStatus } from '../../utils/Helpers';
import JobModel from '../../models/job';

export default (req, res) => {
  /**
   * get job id from reques body using es6 destructuring
  */
  const { job_id } = req.body;

  /**
   * check if job id is a valid mogoDB id
  */
  if(!job_id || !mongoose.Types.ObjectId.isValid(job_id)) {
    return errorResponseWithStatus(res, 404, 'Invalid job ID');
  }

  /**
   * Find a job that has the given id
   * this step is not neccesary now, but will be once company login is up
   * in order to check delete access.
  */
  JobModel.findById(job_id, (err, jobPosting) => {
    if (err) {
      return errorResponseWithStatus(res, 500, 'Delete operation failed');
    }

    if (!jobPosting) {
      return errorResponseWithStatus(res, 404, 'Cannot find portfolio with that ID');
    }

    // if (portfolio.user_id != res.locals.userID) {
    //   return errorResponseWithStatus(res, 404, '!You are not authorized to delete this portfolio');
    // }

    /**
     * if the job exist delete.
     */
    JobModel.findByIdAndRemove(job_id, (err, deletedJobPosting) => {

      if(err) {
        return errorResponseWithStatus(res, 500, 'Delete operation failed');
      }

      if(!deletedJobPosting) {
        return errorResponseWithStatus(res, 404, 'Cannot find job posting with that ID');
      }

      const payload = {};
      payload.data = { success: true, message: 'Job posting deleted successfully' };
      res.status(200).json(payload);
    })
  })
}