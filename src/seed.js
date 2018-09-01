import faker from "faker";
import mongoose from 'mongoose';
import UserModel from './models/user';

/**
 * [User Model Seeder]
 */
for (var i = 1; i <= 1; i++) {

	var data = {
 		first_name: faker.name.firstName(),
 		last_name: faker.name.lastName(),
 		middle_name: faker.name.firstName(),
 		image: faker.image.avatar(),
 		gender: "male",
 		nationality: 1,
 		languages: 2,
 		email: faker.internet.email(),
 		password: faker.internet.password(),
 		oauth_id: faker.internet.password(),
 		account_type: faker.name.title(),
 		access: {
 			title: "fvdfvdfd",
 			access_level: "vsdvsdcsdcsdcsd"
 		}
 	}

	const User = new UserModel(data)

	User.save((err, userInfo) => {
		if (err) {
			console.log(err)
		}
	})
}
