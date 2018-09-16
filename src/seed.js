import faker from "faker";
import mongoose from 'mongoose';
import UserModel from './models/user';
import CountryModel from './models/country';

var user_size = 10
var nationality_size = 2

/**
 * [User Model Seeder]
 */
for (var i = 1; i <= nationality_size; i++) {

	var data = {
 		country_name: faker.address.country(),
 		country_code: faker.address.countryCode(),
 	}

	const Country = new CountryModel(data)

	Country.save((err, country_info) => {

		if (err) {
			console.log(err)
		}

		console.log(country_info)
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
//  		nationality: 1987878788787,
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

//  	console.log(data)

// 	// const User = new UserModel(data)

// 	// User.save((err, userInfo) => {
// 	// 	if (err) {
// 	// 		console.log(err)
// 	// 	}
// 	// })
// }
