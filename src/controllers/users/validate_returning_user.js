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

    const { id } = req.params;

    if (!id || typeof id != "string") {

  	return Helpers.errorResponseWithStatus(res, 401, `${id} is not a valid string`);
    }

    jwt.verify(id, process.env.JWT_SECRET, (err, decodeID) => {

  	if (err) {
  	  return Helpers.errorResponseWithStatus(res, 401, 'User ID not a valid JWT');
  	}

  	const { UserID } = decodeID;

  	UserModel.findById(UserID, (error, user) => {

  	  if (error) {

  		return Helpers.errorResponseWithStatus(res, 401, error);
  	  }

  	  if (!user) {

  		return Helpers.errorResponseWithStatus(res, 401, 'User does not exist in DB');
  	  }

  	  const payload = {};
  	  const responseObj = {};
  	  const { _id, first_name, last_name, email, image, access } = user;
  	  const userToken = jwt.sign({ userID: _id }, process.env.JWT_SECRET);

  	  responseObj.user = {

  		name: `${first_name} ${last_name}`,
  		email: email,
  		picture: image,
  		access: access,
  	  };
  	  responseObj.token = userToken;
  	  payload.data = responseObj;

  	  res.status(200).json(payload);
  	})
    })
  }