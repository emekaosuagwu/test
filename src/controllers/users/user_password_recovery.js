import crypto from 'crypto';

import UserModel from '../../models/user';
import * as Helpers from '../../utils/Helpers';
import { PasswordRecoveryTemplate } from '../../utils/EmailTemplates';
import Mail from '../../utils/mailer';


 /**
  * Controls the Login endpoint. Handles authentication of users.
  * @param  {Object} req express request object that handles request made to server
  * @param  {Object} res express response object that handles response from server
  */
  export default (req, res) => {

    const { email } = req.body;

    if (!email || typeof email != "string") {

  	return Helpers.errorResponseWithStatus(res, 401, `${email} is not a valid string`)
    }

    UserModel.findOne({email: email}, (err, user) => {

  	if (err) return Helpers.errorResponseWithStatus(res, 401, err)

  	if (!user) {

  	  // send response that email does't exist in DB
  	  return Helpers.errorResponseWithStatus(res, 401, "This email doesn't exist in our DB");
  	}

  	const resetToken = crypto.randomBytes(14).toString('hex');
  	const updateObject = {
  	  reset_token: resetToken,
  	  reset_token_expiry: Date.now() + 3*60*60*1000,
  	};

  	UserModel.findByIdAndUpdate(user._id, updateObject, { new: true }, (err, updatedUser) => {

  	  if (err) return Helpers.errorResponseWithStatus(res, 401, err);

  	  const mailSubject = `Password Recovery for ${updatedUser.email}`;
  	  Mail(updatedUser.email, mailSubject, res, PasswordRecoveryTemplate(updatedUser.reset_token), 'park@charisol.io');
  	})
    });
  };
