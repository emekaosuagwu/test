import LanguageModel from '../../models/language'

export default = (req, res) => {

	const errors = [];
	
	const { 
		language_name, 
		language_code 
	} = req.body;

	const requiredStringFields = [language_name, language_code];

	requiredStringFields.map(field => {
		if (!field || typeof field !="string") {
			let errObject = {};
			errObject.status = 401;
			errObject.details = `${field} is not a valid string`;
			errors.push(errObject);
		}
	});

	if(errors.length === 0) {
		const payload = {};
		
		const Language = new LanguageModel({...req.body});
		
		Language.save((err, languageInfo) => {

			if (err) {
				let error = { status: 500, details: err };
				payload.error = error;
				return res.status(500).json(payload);
			}

			const response = { message: true };

			payload.data = response;

			res.status(200).json(payload);
		})
	} 
	else {
		payload.error = errors;
		res.status(401).json(payload);
	}
}
