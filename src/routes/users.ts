import sendEmail from '../lib/sendMail';
const express = require('express');
const User = require('../models/user.ts');

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one applicant
router.post('/create', async (req: any, res: any) => {
  const {
    name,
    middleName,
    email,
    password,
  } = req.body;
  const user = new User({
    name,
    middleName,
    email,
    password,
  });
  try {
    const newUser = await user.save();
    sendEmail(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one applicant
router.patch('/:id', (req, res) => {
});

// Delete one applicant
router.delete('/:id', (req, res) => {
});

module.exports = router;
