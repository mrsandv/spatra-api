import sendEmail from '../lib/sendMail';

const Applicant = require('../models/applicant');

exports.getAll = async (req: any, res: any) => {
  try {
    const applicants = await Applicant.find();
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByFolio = async (req: any, res: any) => {
  Applicant.findById(req.params.folio)
    .then((applicant: any) => {
      if (!applicant) {
        return res.status(404).json({ message: 'Applicant not found' });
      }
      return res.send(applicant);
    }).catch((err: any) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Applicant not found' });
      }
      return res.status(500).json({ message: err.message });
    });
};

exports.getByEmail = async (req: any, res: any) => {
  Applicant.findOne({ email: req.params.email })
    .then((applicant: any) => {
      if (!applicant) {
        return res.status(404).json({ message: 'Applicant not found' });
      }
      return res.send(applicant);
    }).catch((err: any) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Applicant not found' });
      }
      return res.status(500).json({ message: err.message });
    });
};

exports.create = async (req: any, res: any) => {
  const {
    name,
    middleName,
    lastName,
    age,
    email,
    gender,
    nationality,
    phone,
    firstLanguaje,
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
    firstLanguaje,
    vacancy,
    eraFile,
    idFile,
  });
  try {
    const newApplicant = await applicant.save();
    sendEmail(newApplicant);
    res.status(201).json(newApplicant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req: any, res: any) => {
  Applicant.findByIdAndRemove(req.params.folio)
    .then((applicant: any) => {
      if (!applicant) {
        return res.status(404).json({ message: 'Applicant not found' });
      }
      return res.send({ message: 'Applicant removed successfully!' });
    }).catch((err: any) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).json({ message: 'Applicant not found' });
      }
      return res.status(500).json({ message: err.message });
    });
};
