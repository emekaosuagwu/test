import jwt from 'jsonwebtoken';

import UserModel from '../../models/user';
import { CompleteRegistrationTemplate } from '../../utils/EmailTemplates';
import Mail from '../../utils/mailer';


export default (req, res) => {

	// error bags
	const errors = [];

  // extracting data from request body

	let {
    phone,
		email,
    password,
		account_type,
		access_title,
		access_level,
	} = req.body;

// requiredStringFields request validation requirement

const requiredStringFields = [
		phone,
		email,
    password,
		account_type,
		access_title,
		access_level,
	];

  // validate each prop from req body

	requiredStringFields.map(field => {
		if(!field || typeof field != "string") {
			let errObject = {};
			errObject.status = 401;
			errObject.details = `${field} is not a valid string`;
			errors.push(errObject);
		}
	});


	if (errors.length === 0) {

		const payload = {};
		const accessObject = { title: access_title, level: access_level };
		const User = new UserModel({
      phone,
      email,
      password,
      account_type,
			access: accessObject,
		});

		User.save((err, userInfo) => {

			if (err) {
				payload.error = { status: 500, details: err };
				return res.status(500).json(payload);
			}

      // a constant that holds info about email subject to be sent

			const emailSubject = `Hi ${userInfo.email} please complete your Trouvise registration`;

      // A jwt that will be appended to the mail link for validate user

			const tokenizedID = jwt.sign({ UserID: userInfo._id }, process.env.JWT_SECRET);
			Mail(userInfo.email, emailSubject, res, CompleteRegistrationTemplate(tokenizedID));

			const userData = {};
			const userToken = jwt.sign({userID: userInfo._id}, process.env.JWT_SECRET);
			const userObj = {
				email: userInfo.email,
				access: userInfo.access
			};

			userData.user = userObj;
			userData.token = userToken;
			payload.data = userData;

			res.status(200).json(payload);
		})
	}
	else {
		const payload = {};
		payload.error = errors;
		res.status(401).json(payload);
	}
};
