const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

router.get('/clinics', clinicController.getAllClinics); 
router.post('/clinics', clinicController.findClinics); 


router.get('/clinics/:filter', clinicController.findClinics); 

module.exports = router;
