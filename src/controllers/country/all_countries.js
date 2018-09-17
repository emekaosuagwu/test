import CountryModel from '../../models/country';

/**
 * [description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
export default (req, res) => {

	let payload = {};

	CountryModel.find({}, (err, country) => {

		if (err) {
			payload.error = {status: 401, details: err};
			res.status(401).json(payload);
		}

		payload.data = country;
		res.status(200).json(payload);
	})
}