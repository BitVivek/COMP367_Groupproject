const Doctor = require('../models/doctor');

// Existing function
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).send('Error fetching doctors');
    }
};

// New function
exports.createDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(400).send('Error creating doctor');
    }
};

