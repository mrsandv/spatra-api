const sgMail = require('@sendgrid/mail');

function sendEmail(data, toClient) {
	const {
		name,
		middleName,
		lastName,
		age,
		email,
		gender,
		nationality,
		phone,
		firstLanguage,
		vacancy,
		eraFile,
		idFile,
		_id,
	} = data;
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: toClient ? email : process.env.HOST_EMAIL,
		from: process.env.HOST_EMAIL,
		subject: 'Nuevo registro para evaluación',
		text: 'null',
		html: toClient
			? `
		<div>Your registration information is:
			<ul>
				<li>Folio: ${_id}</li>
				<li>Nombre: ${name} ${middleName && middleName} ${lastName}</li>
				<li>Correo: ${email}</li>
				<li>Edad: ${age}</li>
				<li>Género: ${gender}</li>
				<li>Teléfono: ${phone}</li>
				<li>Primera lengua: ${firstLanguage}</li>
				<li>Vacante: ${vacancy}</li>
				<li>Nacionalidad: ${nationality}</li>
			</ul>
		</div>`
			: `
			<div>La informacion de contacto para el nuevo registro es:
				<ul>
					<li>Nombre: ${name} ${middleName && middleName} ${lastName}</li>
					<li>Correo: ${email}</li>
					<li>Edad: ${age}</li>
					<li>Género: ${gender}</li>
					<li>Teléfono: ${phone}</li>
					<li>Primera lengua: ${firstLanguage}</li>
					<li>Vacante: ${vacancy}</li>
					<li>Nacionalidad: ${nationality}</li>
				</ul>
				<p>Sistema ERA</p>
				<img src="${eraFile}" />
				<br/>
				<p>Identificación</p>
				<img src="${idFile}" />
			</div>`,
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

const Applicant = require('../models/applicant');

exports.getAll = async (req, res) => {
	try {
		const applicants = await Applicant.find();
		res.json(applicants);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getByFolio = async (req, res) => {
	Applicant.findById(req.params.folio)
		.then((applicant) => {
			if (!applicant) {
				return res.status(404).json({ message: 'Applicant not found' });
			}
			return res.send(applicant);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ message: 'Applicant not found' });
			}
			return res.status(500).json({ message: err.message });
		});
};

exports.getByEmail = async (req, res) => {
	Applicant.findOne({ email: req.params.email })
		.then((applicant) => {
			if (!applicant) {
				return res.status(404).json({ message: 'Applicant not found' });
			}
			return res.send(applicant);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ message: 'Applicant not found' });
			}
			return res.status(500).json({ message: err.message });
		});
};

exports.create = async (req, res) => {
	const {
		name,
		middleName,
		lastName,
		age,
		email,
		gender,
		nationality,
		phone,
		firstLanguage,
		vacancy,
		eraFile,
		idFile,
	} = req.body;
	const applicant = new Applicant({
		name,
		middleName,
		lastName,
		age,
		email,
		gender,
		nationality,
		phone,
		firstLanguage,
		vacancy,
		eraFile,
		idFile,
	});
	try {
		const newApplicant = await applicant.save();
		sendEmail(newApplicant);
		sendEmail(newApplicant, true);
		res.status(201).json(newApplicant);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.delete = async (req, res) => {
	Applicant.findByIdAndRemove(req.params.folio)
		.then((applicant) => {
			if (!applicant) {
				return res.status(404).json({ message: 'Applicant not found' });
			}
			return res.send({ message: 'Applicant removed successfully!' });
		})
		.catch((err) => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).json({ message: 'Applicant not found' });
			}
			return res.status(500).json({ message: err.message });
		});
};
