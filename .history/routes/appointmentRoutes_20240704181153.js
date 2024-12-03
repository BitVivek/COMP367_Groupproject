const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Routes for appointments

// Create a new appointment
router.post('/appointments', appointmentController.createAppointment);

// Get all appointments
router.get('/appointments', appointmentController.getAllAppointments);

// Get appointment by ID
router.get('/appointments/:appointmentId', appointmentController.getAppointmentById);

// Update appointment by ID
router.put('/appointments/:appointmentId', appointmentController.updateAppointmentById);

// Delete appointment by ID
router.delete('/appointments/:appointmentId', appointmentController.deleteAppointmentById);

module.exports = router;
