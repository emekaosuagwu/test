import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import WorkHistoryModel from '../../models/work_history';
import { errorResponseWithStatus } from '../../utils/Helpers';

 /**
  * [description user login controller]
  * @param  {[type]} req [description]
  * @param  {[type]} res [description]
  * @return {[type]}     [description]
  */
export default (req, res) => {

	/**
	 * [if checking if ]
	 * @param  {String} !req.headers.authorization || req.headers.authorization.split(' ')[0] ! [description]
	 * @return {[type]} [description]
	 */
	if (!req.headers.authorization || req.headers.authorization.split(' ')[0] != 'Bearer') {
		return errorResponseWithStatus(res, 500, 'Invalid Header. Auth Bearer is needed to identify user');
	}

 	/**
 	 * [errors error bag]
 	 * @type {Array}
 	 */
 	const errors = [];

 	/**
 	 *  extracting data from request body
 	 */
 	const { 
 		company_name,
 		company_website,
 		company_icon,
 		company_address,
 		start_date,
 		end_date,
 		job_description,
 		job_title,
 	} = req.body;

 	/**
 	 *  add comment
 	 */
 	const incomingPayload = [ 
 		company_name,
 		company_website,
 		company_icon,
 		company_address,
 		start_date,
 		end_date,
 		job_description,
 		job_title,
 	];

 	// /**
 	//  * [description validating request body params]
 	//  * @param  {[type]} field [description]
 	//  * @return {[type]}       [description]
 	//  */
 	incomingPayload.map(field => {
 		if (!field || typeof field != "string") {
 			let errObject = {};
 			errObject.status = 401;
 			errObject.details = `${field} is not a valid string`;
 			errors.push(errObject);
 		};
 	});

 	if(errors.length === 0) {

 			const payload = {};
 			
 			const WorkHistory = new WorkHistoryModel({
				user_id: res.locals.userID, 
				company_name,
				company_website,
				company_icon,
				company_address,
				start_date,
				end_date,
				job_description,
				job_title,
 			});

			WorkHistory.save((err, work_history_info) => {

				if (err) {
					payload.error = { status: 500, details: err };
					return res.status(500).json(payload);
				}

				payload.data = work_history_info;

				res.status(200).json(payload);
			})
 	}
 	else {
 		const payload = {};
 		payload.error = errors;
 		return res.status(401).json(payload);
 	}
};

