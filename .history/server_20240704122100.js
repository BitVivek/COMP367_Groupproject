const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB Atlas
const connectionString = 'mongodb+srv://team3comp231:1JJ07yELi1B3hvvY@cluster0.k7h52mi.mongodb.net/Hospital_management?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

// Define Appointment schema and model
const appointmentSchema = new mongoose.Schema({
    patientName: String,
    date: String,
    time: String,
    reason: String
}, { collection: 'DrAppointment' });

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Handle form submission
app.post('/appointments', async (req, res) => {
    const { patientName, date, time, reason } = req.body;
    const appointment = new Appointment({ patientName, date, time, reason });

    try {
        await appointment.save();
        res.send('Appointment scheduled successfully!');
    } catch (error) {
        res.status(500).send('Error scheduling appointment.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
