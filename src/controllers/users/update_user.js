import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/user';
import { errorResponseWithStatus } from '../../utils/Helpers';

export default (req, res) => {

  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] != 'Bearer') {
    return errorResponseWithStatus(res, 500, 'Invalid Header. Auth Bearer is needed to identify user');
  }

  const sentToken = req.headers.authorization.split(' ')[1];

  jwt.verify(sentToken, process.env.JWT_SECRET, (err, decodeObj) => {
    if (err) {
      return errorResponseWithStatus(res, 500, 'Jwt Authentication Failed');
    }

    const errors = [];
    const { userID } = decodeObj;

    const {
      first_name,
      last_name,
      middle_name,
      image,
      phone,
      gender,
      nationality,
      languages,
      email,
    } = req.body;

    const updateObj = {
      first_name,
      last_name,
      middle_name,
      image,
      phone,
      gender,
      nationality,
      languages,
      email,
    };

    Object.keys(updateObj).map(field => {

      if (field === 'nationality') {
        if (!mongoose.Types.ObjectId.isValid(updateObj[field])) {
          const error = { status: 404, details: 'Nationality is not valid' };
          errors.push(error);
        }
      };

      if (field === 'languages') {

        if (!Array.isArray(updateObj[field])) {
          const error = { status: 404, details: 'Languages should be an array' };
          return errors.push(error);
        }

        if ( updateObj[field].length > 0) {
          languages.map(language => {
            if (!mongoose.Types.ObjectId.isValid(language)) {
              const error = { status: 404, details: 'Language should be selected from DB options' };
              errors.push(error);
            }
          })

        } else {
          const error = { status: 404, details: ' At least, one language should be selected' };
          errors.push(error);
        }
      };

      if (field !== 'languages' && field !== 'nationality') {
        if (!updateObj[field] || typeof updateObj[field] !== "string") {
          const error = { status: 404, details: `${field} is not a valid string` };
          errors.push(error);
        }
      };

    });


    if (errors.length === 0) {

      UserModel.findByIdAndUpdate(userID, updateObj, { new: true }, (err, updatedUser) => {

        if (err) {
          console.log(err);
          return errorResponseWithStatus(res, 500, 'User info update failed');
        }


        const dataObj = {
          success: true,
          user: {
            name: `${updatedUser.first_name} ${updatedUser.last_name}`,
 						email: updatedUser.email,
 						picture: updatedUser.image,
 						access: updatedUser.access
          }
        };

        const payload = {};
        payload.data = dataObj;
        res.status(200).json(payload);
      })
    } else {
      const payload = { error: errors };
      res.status(404).json(payload);
    }
  })
};
