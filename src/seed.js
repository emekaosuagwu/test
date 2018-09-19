import dotenv from 'dotenv';
import mongoose from 'mongoose';

import faker from "faker";
import UserModel from './models/user';
import CountryModel from './models/country';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('Database Connected'))
  .catch(error => console.log('Error connecting to database', error));

var user_size = 1
var nationality_size = 1

/**
 * [User Model Seeder]
 */
for (var i = 1; i <= nationality_size; i++) {

	var data = {
 		country_name: faker.address.country(),
 		country_code: faker.address.countryCode(),
 	}

	const Country = new CountryModel(data)

	Country.save((err, countryInfo) => {
		if (err) {
			console.log(err)
		}
	})
}

// /**
//  * [User Model Seeder]
//  */
// for (var i = 1; i <= user_size; i++) {

// 	var data = {
//  		first_name: faker.name.firstName(),
//  		last_name: faker.name.lastName(),
//  		middle_name: faker.name.firstName(),
//  		image: faker.image.avatar(),
//  		gender: "male",
//  		languages: 1987878788787,
//  		email: faker.internet.email(),
//  		phone: faker.internet.ip(),
//  		password: faker.internet.password(),
//  		oauth_id: faker.internet.password(),
//  		account_type: faker.name.title(),
//  		reset_token: faker.name.title(),
//  		reset_token_expiry: faker.name.title(),
//  		access: {
//  			title: "fvdfvdfd",
//  			level: "vsdvsdcsdcsdcsd"
//  		}
//  	}

//  	CountryModel.find({}, (err, country) => {
//  		if (err) {
//  			console.log(err)
//  		}

//  		data.nationality = country[0]
//  	})

// 	const User = new UserModel(data)

// 	User.save((err, userInfo) => {
// 		if (err) {
// 			console.log(err)
// 		}
// 	})
// }
