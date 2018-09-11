// import Login from './user_login';

const Init = (req, res) => {

	Mail("emeka@gmail.com", "emailSubject", {}, CompleteRegistrationTemplate("tokenizedID"));
	res.status(200).send(`We're running on user route!`)
};

export {
	Init,
};