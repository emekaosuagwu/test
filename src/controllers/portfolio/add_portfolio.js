import PortfolioModel from '../../models/portfolio';
import { errorResponseWithStatus } from '../../utils/Helpers';

export default (req, res) => {
  const errors = [];

  const {
    url,
    name,
    description,
  } = req.body;

  const portfolioInfoObj = {
    url,
    name,
    description,
  };

  Object.keys(portfolioInfoObj).map(field => {

    if (typeof portfolioInfoObj[field] !== 'string' ) {
      const error = { status: 404, details: `${field} is not a valid string` };
      errors.push(error);
    }
  });

  if (errors.length === 0) {

    /**
     * res.locals.userID contains user ID that is passed into handler function
     * from validate-request.js middleware.
     */
    portfolioInfoObj.user_id = res.locals.userID;
    const Portfolio = new PortfolioModel({...portfolioInfoObj});
    Portfolio.save((err, portfolioInfo) => {
      if (err) {
        return errorResponseWithStatus(res, 500, 'Error, cannot save portfolio');
      }

      const payload = {};
      payload.data = { success: true, message: 'Portfolio saved successfully' };
      res.status(200).json(payload);
    })


  } else {
    const payload = { error: errors };
    res.status(404).json(payload);
  }
};

