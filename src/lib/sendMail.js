const sgMail = require('@sendgrid/mail');

function sendEmail(data) {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: 'contacto@spanish-ta.com',
		from: 'contacto@spanish-ta.com',
		subject: 'Sending with SendGrid is Fun',
		text: 'Test message to sendgrind integration',
		html: `<strong>Important information: New applicant contact ${data.name}</strong>`,
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch((error) => {
			console.error(error);
		});
}

exports.modules = sendEmail;
