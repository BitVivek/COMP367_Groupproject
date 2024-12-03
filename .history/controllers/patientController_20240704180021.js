const Patient = require('../models/patient');

// Example function to fetch all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).send('Error fetching patients');
    }
};


