/*
const express = require('express');
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

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the doctor_portal.html file
app.get('/doctor_portal.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'doctor_portal.html'));
});

// Serve the schedule_appointment.html file
app.get('/schedule_appointment.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'schedule_appointment.html'));
});

// Serve the view_update_records.html file
app.get('/view_update_records.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'view_update_records.html'));
});

// Serve the patient_portal.html file
app.get('/patient_portal.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'patient_portal.html'));
});

// Serve the access_health_records.html file
app.get('/access_health_records.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'access_health_records.html'));
});

// Serve the book_appointment.html file
app.get('/book_appointment.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'book_appointment.html'));
});

// Serve the nurse_portal.html file
app.get('/nurse_portal.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'nurse_portal.html'));
});

// Serve the update_patient_information.html file
app.get('/update_patient_information.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'update_patient_information.html'));
});

// Serve the search.html file
app.get('/search.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'search.html'));
});

// Handle updating patient records
app.post('/update_patient_records', async (req, res) => {
    const { patientName, dateOfBirth, medicalHistory } = req.body;

    try {
        await Patient.findOneAndUpdate({ patientName }, { dateOfBirth, medicalHistory }, { new: true, upsert: true });
        res.send('Patient record updated successfully!');
    } catch (error) {
        res.status(500).send('Error updating patient record.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

*/
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const indexRoutes = require('./routes/indexRoutes'); // Import indexRoutes

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Atlas connection
const connectionString = 'your_mongodb_connection_string_here';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

// Routes
app.use('/api', indexRoutes); // Mount indexRoutes under '/api' prefix

// Serve specific HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle updating patient records (if needed separately from CRUD)
app.post('/update_patient_records', async (req, res) => {
    // Implementation as per your requirements
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
*