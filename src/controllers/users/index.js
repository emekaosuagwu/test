import Login from "./user_login"
import Register from "./user_register"
import PasswordReset from "./user_reset_password"
import PasswordRecovery from "./user_password_recovery"
import ValidateResetToken from "./validate_request_token"
import ValidateReturningUser from "./validate_returning_user"

import { PasswordRecoveryTemplate, CompleteRegistrationTemplate } from '../../utils/EmailTemplates';

import Mail from '../../utils/mailer';

const Init = (req, res) => {

	Mail("emeka@gmail.com", "emailSubject", {}, CompleteRegistrationTemplate("tokenizedID"));
	res.status(200).send(`We're running on user route!`)
};

export {
	Init,
	Login,
	Register,
	PasswordReset,
	PasswordRecovery,
	ValidateResetToken,
	ValidateReturningUser
};