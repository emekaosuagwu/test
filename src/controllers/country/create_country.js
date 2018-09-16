import CountryModel from '../../models/country';

/**
 * [description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
export default (req, res) => {

	const errors = [];

	const { 
		country_name, 
		country_code 
	} = req.body;

	const requiredStringFields = [
		country_name, 
		country_code
	];

	/**
	* [description]
	* @param  {[type]} field [description]
	* @return {[type]}       [description]
	*/
	requiredStringFields.map(field => {
		if (!field || typeof field !="string") {
			let errObject = {};
			errObject.status = 401;
			errObject.details = `${field} is not a valid string`;
			errors.push(errObject);
		}
	});

	/**
	 * [if description]
	 * @param  {[type]} errors.length [description]
	 * @return {[type]}               [description]
	 */
	if(errors.length === 0) {

		const payload = {};
		const Country = new CountryModel({...req.body});

		Country.save((err, countryInfo) => {

			if (err) {
				let error = { status: 500, details: err };
				payload.error = error;
				return res.status(500).json(payload);
			};

			const country = { 
				id: countryInfo._id, 
				country_name: 
				countryInfo.country_name 
			};
			
			payload.data = country;
			res.status(200).json(payload);
		})
	} 
	else {
		payload.error = errors;
		res.status(401).json(payload);
	}
};
