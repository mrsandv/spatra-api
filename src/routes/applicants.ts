const express = require('express');
const applicants = require('../controllers/applicants');

const router = express.Router();

router.get('/all', applicants.getAll);

router.get('/folio/:folio', applicants.getByFolio);
router.get('/email/:email', applicants.getByEmail);
router.post('/create', applicants.create);
router.delete('/delete/:folio', applicants.delete);

module.exports = router;
