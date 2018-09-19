import LanguageModel from '../models/language'

/**
 * 
 */
class UserRepository {

	fineAllLanguages() {

		LanguageModel.find({_id: 1}, (err, languages) => {
		
		})

	}

}

export default UserRepository;