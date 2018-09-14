import mongoose from 'mongoose';
import PortfolioModel from '../../models/portfolio';
import { errorResponseWithStatus } from '../../utils/Helpers';

export default (req, res) => {

  const errors = [];
  if (Object.keys(req.body).length > 1 && req.body.portfolio_id) {

    if (!mongoose.Types.ObjectId.isValid(req.body.portfolio_id)) {
      return errorResponseWithStatus(res, 404, 'Invalid portfolio_id');
    }

    Object.keys(req.body).map(field => {

      if (field) {

        if (typeof field !== 'string' ) {
          const error = { status: 404, details: `${field} is not a valid string` };
          errors.push(error);
        }
      };
    });
  } else {
    return errorResponseWithStatus(res, 404, "Cannot update portfolio with empty data or invalid ID");
  }

  if (errors.length === 0) {
    const updateOBj = {...req.body};
    updateOBj.user_id = res.locals.userID;
    PortfolioModel.findByIdAndUpdate(req.body.portfolio_id, updateOBj, { new: true }, (err, newPortfolioInfo) => {
      if (err) {
        return errorResponseWithStatus(res, 500, 'Portfolio update failed');
      }

      if(!newPortfolioInfo) {
        return errorResponseWithStatus(res, 500, 'Portfolio ID is missing in DB');
      }

      const payload = {};
      payload.data = { status: 200, info: newPortfolioInfo }
      res.status(200).json(payload);
    })
  } else {
    const payload = { error: errors };
    res.status(404).json(payload);
  }
};
