import jwt from "jsonwebtoken";

import UserModel from "../../models/user";
import * as Helpers from "../../utils/Helpers";

/**
 * Controls the Login endpoint. Handles authentication of users.
 * @param  {Object} req express request object that handles request made to server
 * @param  {Object} res express response object that handles response from server
 */
export default (req, res) => {
  /**
   * Accumulator that stores req.body params' error
   * @type {Array}
   */
  const errors = [];

  /**
   *  extracting data from request body
   */
  const { email, password } = req.body;

  /**
   *  creating a new arrray that stores req params to make validation easier
   */
  const incomingPayload = [email, password];

  /**
   * Check if field exist and if field is a valid string
   */
  incomingPayload.map(field => {
    if (!field || typeof field != "string") {
      let errObject = {};
      errObject.status = 401;
      errObject.details = `${field} is not a valid string`;
      errors.push(errObject);
    }
  });

  if (errors.length === 0) {
    UserModel.findOne({ email: email }, function(err, user) {
     
      if (err) {
        return Helpers.errorResponseWithStatus(res, 401, err);
      }
   
      if (!user) {
        /**
         * helper that handles error reponse from the server
         */
        return Helpers.errorResponseWithStatus(
          res,
          401,
          "Username or password does not exist in the database"
        );
      }
      
user.comparePassword(password, (err, ismatch) => {
        if (err) {
          return Helpers.errorResponseWithStatus(res, 401, err);
        }

        if (ismatch) {
          const payload = {};
          const userData = {};
          const userToken = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET
          );

          /**
           * If user authentication is successful. The object below will be
           * added to the payload that will be sent to the client
           */
          const userInfo = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            picture: user.image,
            access: user.access
          };

          userData.user = userInfo;
          userData.token = userToken;
          payload.data = userData;
          res.status(200).json(payload);
        } else {
          return Helpers.errorResponseWithStatus(
            res,
            401,
            "Username or password does not exist in the database"
          );
        }
      });
    });
  } else {
    const payload = {};
    payload.error = errors;
    return res.status(401).json(payload);
  }
};
