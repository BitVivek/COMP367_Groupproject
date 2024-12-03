const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Route to fetch all doctors
router.get('/doctors', doctorController.getAllDoctors);

module.exports = router;
