import mongoose from 'mongoose';
import { errorResponseWithStatus } from '../../utils/Helpers';
import PortfolioModel from '../../models/portfolio';

export default (req, res) => {
  const { portfolio_id } = req.body;

  if(!portfolio_id || !mongoose.Types.ObjectId.isValid(portfolio_id)) {
    return errorResponseWithStatus(res, 404, 'Invalid Porfolio ID');
  }

  PortfolioModel.findById(portfolio_id, (err, portfolio) => {
    if (err) {
      return errorResponseWithStatus(res, 500, 'Delete operation failed');
    }

    if (!portfolio) {
      return errorResponseWithStatus(res, 404, 'Cannot find portfolio with that ID');
    }

    if (portfolio.user_id != res.locals.userID) {
      return errorResponseWithStatus(res, 404, '!You are not authorized to delete this portfolio');
    }

    PortfolioModel.findByIdAndRemove(portfolio_id, (err, deletedPortfolio) => {

      if(err) {
        return errorResponseWithStatus(res, 500, 'Delete operation failed');
      }

      if(!deletedPortfolio) {
        return errorResponseWithStatus(res, 404, 'Cannot find portfolio with that ID');
      }

      const payload = {};
      payload.data = { success: true, message: 'Porfolio deleted successfully' };
      res.status(200).json(payload);
    })
  })
}