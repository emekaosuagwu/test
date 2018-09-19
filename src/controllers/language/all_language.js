import LanguageModel from '../../models/language'
import LanguageRepository from '../../repositories/language_repository'

/**
 * [language_repository create an instance of the language repository]
 * @type {LanguageRepository}
 */
const language_repository = new LanguageRepository();

export default async (req, res) => {

	let payload = {};

	var response = await language_repository.fineAllLanguages();

	console.log(response)
	res.status(200).json(response);

}