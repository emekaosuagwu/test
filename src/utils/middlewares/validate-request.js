import jwt from 'jsonwebtoken';
import UserModel from '../../models/user';
import { errorResponseWithStatus } from '../Helpers';

export default (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] != 'Bearer') {
    return errorResponseWithStatus(res, 500, 'Invalid Header. Auth Bearer is needed to identify user');
  }

  const sentToken = req.headers.authorization.split(' ')[1];

  jwt.verify(sentToken, process.env.JWT_SECRET, (err, decodeObj) => {
    if (err) {
      return errorResponseWithStatus(res, 500, 'Jwt Authentication Failed');
    }

    const { userID } = decodeObj;

    UserModel.findById(userID, (err, user) => {

      if (err) {
        return errorResponseWithStatus(res, 500, `User token validation failed`);
      }

      if (!user) {
        return errorResponseWithStatus(res, 404, `User doesn't exist in database`);
      }

      res.locals.userID = userID;
      next();

    });
  });
};