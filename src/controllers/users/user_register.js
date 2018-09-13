import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import UserModel from '../../models/user';
import { CompleteRegistrationTemplate } from '../../utils/EmailTemplates';
import Mail from '../../utils/mailer';

/**
 * [description user register controller]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
export default (req, res) => {

	/**
	 * [errors bags]
	 * @type {Array}
	 */
	const errors = [];

	/**
	 *  extracting data from request body
	 */
	let {
		first_name,
		last_name,
		middle_name,
		image,
		gender,
		nationality,
		languages,
		email,
		password,
		oauth_id,
		account_type,
		access_title,
		access_level,
	} = req.body;

  // requiredStringFields request validation requirement

	const requiredStringFields = [
		first_name,
		last_name,
		middle_name,
		image,
		gender,
		email,
		password,
		account_type,
		access_title,
		access_level,
	];

	// requiredStringFields validating request body params
	requiredStringFields.map(field => {
		if(!field || typeof field != "string") {
			let errObject = {};
			errObject.status = 401;
			errObject.details = `${field} is not a valid string`;
			errors.push(errObject);
		}
	});

	/**
	 * [if description add comment]
	 * @param  {String} !oauth_id || typeof first_name ! [description]
	 * @return {[type]} [description]
	 */
	if (!oauth_id || typeof first_name != "string") {
		oauth_id = "";
	};

	/**
	 * [if description add comment]
	 * @param  {[type]} !nationality || !mongoose.Types.ObjectId.isValid(nationality) [description]
	 * @return {[type]}              [description]
	 */
	if (!nationality || !mongoose.Types.ObjectId.isValid(nationality)) {
		let errObject = {};
		errObject.status = 401;
		errObject.details = `${nationality} is not a valid mongoose ID`;
		errors.push(errObject);
	}

	/**
	 * [if description add comment]
	 * @param  {[type]} Array.isArray(languages) [description]
	 * @return {[type]}                          [description]
	 */
	if (Array.isArray(languages)) {
		if(languages.length < 1) {
			let errObject = {};
			errObject.status = 401;
			errObject.details = "Atleast, one languages should be selected";
			errors.push(errObject);
		}

		/**
		 * [description add comment]
		 * @param  {[type]} language [description]
		 * @return {[type]}          [description]
		 */
		languages.map(language => {
			if(! mongoose.Types.ObjectId.isValid(language)) {
				let errObject = {};
				errObject.status = 401;
				errObject.details = `${language} is not a valid mongoose ID`;
				errors.push(errObject);
			}
		})
	}
	else {
		let errObject = {};
		errObject.status = 401;
		errObject.details = "languages should be an array";
		errors.push(errObject);
	}

	if (errors.length === 0) {

		/**
		 * add comment
		 */
		const payload = {};

		/**
		 * add comment
		 */
		const accessObject = { title: access_title, level: access_level };

		/**
		 * add comment
		 */
		const User = new UserModel({
			first_name,
			last_name,
			middle_name,
			image,
			gender,
			nationality,
			languages,
			email,
			password,
			oauth_id,
			account_type,
			access: accessObject,
		});

		/**
		 * [description add comment]
		 * @param  {[type]} (err, userInfo      [description]
		 * @return {[type]}       [description]
		 */
		User.save((err, userInfo) => {

			if (err) {
				payload.error = { status: 500, details: err };
				return res.status(500).json(payload);
			}

			/**
			 * add comment
			 */
			const emailSubject = `Hi ${userInfo.first_name} please complete your Trouvise registration`;

			/**
			 * add comment
			 */
			const tokenizedID = jwt.sign({ UserID: userInfo._id }, process.env.JWT_SECRET);

			/**
			 * add comment
			 */
			Mail(userInfo.email, emailSubject, res, CompleteRegistrationTemplate(tokenizedID));

			/**
			 * add comment
			 */
			const userData = {};

			/**
			 * add comment
			 */
			const userToken = jwt.sign({userID: userInfo._id}, process.env.JWT_SECRET);

			/**
			 * add comment
			 */
			const userObj = {
				name: `${userInfo.first_name} ${userInfo.last_name}`,
				email: userInfo.email,
				picture: userInfo.image,
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
