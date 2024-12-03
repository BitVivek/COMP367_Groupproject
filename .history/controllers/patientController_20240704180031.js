const Patient = require('../models/patient');

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).send('Error fetching patients');
    }
};


