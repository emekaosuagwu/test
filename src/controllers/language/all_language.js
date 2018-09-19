import LanguageModel from '../../models/language'
import LanguageRepository from '../../repositories/language_repository'

/**
 * [language_repository create an instance of the language repository]
 * @type {LanguageRepository}
 */
const language_repository = new LanguageRepository();


export default (req, res) => {

let payload = {};

	LanguageModel.find({}, (err, languages) => {
	
		if (err) {
			payload.error = { status: 401, details: err };
			res.status(401).json(payload);
		}

		payload.data = language_repository.list();
		res.status(200).json(payload);
	})
}