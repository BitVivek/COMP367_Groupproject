const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Route to fetch all patients
router.get('/patients', patientController.getAllPatients);

// Add other routes for patients as needed

module.exports = router;
