const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date },
    Gender: { type: String },
    medicalHistory: { type: String },
    vitalSigns: { type: String },
    diagnosis: { type: String },
    bloodPressure: { type: Number },
    temperature: { type: Number },
    heartRate: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);
