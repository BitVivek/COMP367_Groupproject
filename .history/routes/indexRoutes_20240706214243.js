// routes/index.js

/*const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const doctorController = require('../controllers/doctorController');
const appointmentController = require('../controllers/appointmentController');

// Log the controller functions to check if they are undefined
console.log('patientController.createPatient:', patientController.createPatient);
console.log('doctorController.createDoctor:', doctorController.createDoctor);
console.log('appointmentController.createAppointment:', appointmentController.createAppointment);

// Patients routes
router.post('/patients', patientController.createPatient);
router.get('/patients', patientController.getAllPatients);
router.get('/patients/:id', patientController.getPatientById);
router.put('/patients/:id', patientController.updatePatient);
router.delete('/patients/:id', patientController.deletePatient);

// Doctors routes
router.post('/doctors', doctorController.createDoctor);
router.get('/doctors', doctorController.getAllDoctors);
router.get('/doctors/:id', doctorController.getDoctorById);
router.put('/doctors/:id', doctorController.updateDoctor);
router.delete('/doctors/:id', doctorController.deleteDoctor);

// Appointments routes
router.post('/appointments', appointmentController.createAppointment);
router.get('/appointments', appointmentController.getAllAppointments);
router.get('/appointments/:id', appointmentController.getAppointmentById);
router.put('/appointments/:id', appointmentController.updateAppointment);
router.delete('/appointments/:id', appointmentController.deleteAppointment);

module.exports = router;
