import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

import UserModel from '../../models/user';
import * as Helpers from '../../utils/Helpers';
import { PasswordRecoveryTemplate, CompleteRegistrationTemplate } from '../../utils/EmailTemplates';
import Mail from '../../utils/mailer';

const saltRounds = 10;

 /**
  * [description user login controller]
  * @param  {[type]} req [description]
  * @param  {[type]} res [description]
  * @return {[type]}     [description]
  */
  export default (req, res) => {

    const { token } = req.params;

    if (!token || typeof token != "string") {

  	return Helpers.errorResponseWithStatus(res, 401, `${token} is not a valid string`)
    }

    // The DB will be queried with this object, reset_token_expiry must be greater than the current time.
    const DBQuery = {
  	reset_token: token,
  	reset_token_expiry: {$gt: Date.now()},
    };

    UserModel.findOne(DBQuery, (err, user) => {

  	if(err) {

  	  return Helpers.errorResponseWithStatus(res, 401, err);
  	}

  	if (!user) {

  	  return Helpers.errorResponseWithStatus(res, 401, "User doesn't exist in database");
  	}

  	// returns a success message to acknoledge token validity
  	const payload = {};
  	payload.data = { success: true, message: "User exist in database" };
  	return res.status(200).send(payload);
    })
  }
