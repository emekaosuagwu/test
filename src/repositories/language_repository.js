import LanguageModel from '../models/country'

/**
 * 
 */
class LanguageRepository {

	async fineAllLanguages() {

		LanguageModel.find({}, (err, languages) => {
			

			var emeka = "dfvsrd";
			var ben = "fvdfvdfvdff"
			return "emeka || ben"
			
		})

	}

}

export default LanguageRepository;