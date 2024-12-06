
const Patient = require('../models/patient');

exports.createPatient = async (req, res) => {
    
    // Check for required fields
    if (!name || !email || !dateOfBirth) {
        return res.status(400).json({ error: 'All fields (name, email, dateOfBirth) are required' });
    }
    try {
        const patient = new Patient(req.body);
        console.log(req.body);
        console.log(patient);
        await patient.save();
        res.status(201).json(patient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndDelete(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
