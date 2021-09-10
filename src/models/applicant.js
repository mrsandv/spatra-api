const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	middleName: {
		type: String,
	},
	lastName: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	gender: {
		type: String,
		required: true,
	},
	nationality: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	firstLanguage: {
		type: String,
		required: true,
	},
	vacancy: {
		type: String,
		required: true,
	},
	applicantDate: {
		type: Date,
		default: Date.now,
	},
	eraFile: {
		type: Buffer,
		contentType: String,
		required: true,
	},
	idFile: {
		type: Buffer,
		contentType: String,
		required: true,
	},
});

module.exports = mongoose.model('Applicant', applicantSchema);
