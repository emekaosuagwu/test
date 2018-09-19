import LanguageModel from '../../models/language'

export default (req, res) => {

let payload = {};

	LanguageModel.find({}, (err, languages) => {
	
		if (err) {
			payload.error = { status: 401, details: err };
			res.status(401).json(payload);
		}

		payload.data = languages;
		res.status(200).json(payload);
	})
}