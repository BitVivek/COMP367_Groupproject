/const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// MongoDB Atlas connection
const connectionString = 'mongodb+srv://team3comp231:1JJ07yELi1B3hvvY@cluster0.k7h52mi.mongodb.net/Hospital_management?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
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

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route to handle form submission (for demonstration purposes, just respond with a success message)
app.post('/appointments', (req, res) => {
    res.send('Appointment scheduled successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});*/


