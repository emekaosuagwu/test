import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// create reusable transporter object using the default SMTP transport
const mailConfig = {
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
	}
}

const transporter = nodemailer.createTransport(mailConfig);

/**
 * Recieves information that will be used to customize password recovery email.
 * Default value is set for senderEmail
 * @arg  {string} receiverEmail - email of the recipient
 * @arg  {string} subject - subject of email
 * @arg  {string} response - express response object
 * @arg  {string} HtmlTemplate - Html string that will be sent as the body of email
 * @arg  {string} senderEmail - email of the sender *
 * @return {Object} Send response from sever using express response for error or success
 */
const Mail = (receiverEmail, subject, response, HtmlTemplate, senderEmail = process.env.MAIL_SENDER_EMAIL) => {

	let mailOptions = {
		from: senderEmail,
		to: receiverEmail,
		subject: subject,
		html: HtmlTemplate,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		
		if (error) {
			const payload = {};
			payload.error = { status: 401, details: error };
			return response.status(401).json(payload);
		}

		const payload = {};

		payload.data = { success: true, message: "mail sent successfully" };
		response.status(200).send(payload);
	});
}

export default Mail;
