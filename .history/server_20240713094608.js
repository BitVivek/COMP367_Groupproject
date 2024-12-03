
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
const connectionString = 'mongodb+srv://team3comp231:1JJ07yELi1B3hvvY@cluster0.k7h52mi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your actual MongoDB connection string
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

// Serve register_patient.html for new patient registration
app.get('/register_patient.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register_patient.html'));
});

// Handle creating new patients
app.post('/api/patients', async (req, res) => {
    const { name, dateOfBirth, medicalHistory, vitalSigns } = req.body;

    try {
        // Assuming you have a Patient model defined with Mongoose
        // Create a new patient instance
        const newPatient = new Patient({
            name,
            dateOfBirth,
            medicalHistory,
            vitalSigns
        });

        // Save the new patient to the database
        await newPatient.save();

        res.status(201).json(newPatient); // Respond with the created patient data
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).send('Error creating patient.');
    }
});

// Handle updating patient records (if needed separately from CRUD)
app.post('/api/update_patient_records', async (req, res) => {
    const { patientName, dateOfBirth, medicalHistory } = req.body;

    try {
        // Assuming you have a Patient model defined with Mongoose
        // Example:
        // await Patient.findOneAndUpdate({ patientName }, { dateOfBirth, medicalHistory }, { new: true, upsert: true });
        res.send('Patient record updated successfully!');
    } catch (error) {
        console.error('Error updating patient record:', error);
        res.status(500).send('Error updating patient record.');
    }
});

// Error handling middleware for 404 Not Found
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
