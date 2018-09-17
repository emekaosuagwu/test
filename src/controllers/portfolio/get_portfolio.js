import PortfolioModel from '../../models/portfolio';
import { errorResponseWithStatus } from '../../utils/Helpers';


export default (req, res) => {
  const userID = req.params.user_id;

  PortfolioModel.find({ user_id: userID }, (err, portfolio) => {
    if (err) {
      return errorResponseWithStatus(res, 500, 'Search operation failed. Please make sure userID is correct');
    }

    if (!portfolio) {
      return errorResponseWithStatus(res, 404, 'Portfolio not found');
    }

    const payload = {};
    payload.data = portfolio;
    res.status(200).json(payload);
  });
};