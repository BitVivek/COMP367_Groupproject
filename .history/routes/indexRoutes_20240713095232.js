
const express = require('express');
const router = express.Router();

const patientRoutes = require('./patientRoutes');
const doctorRoutes = require('./doctorRoutes');
const appointmentRoutes = require('./appointmentRoutes');

router.use(patientRoutes);
router.use(doctorRoutes);
router.use(appointmentRoutes);

module.exports = router;
