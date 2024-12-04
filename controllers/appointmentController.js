const Appointment = require('../models/appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    const { doctorId, patientId, date, time, reason } = req.body;

    // Validation
    if (!doctorId || !patientId || !date || !time || !reason) {
        return res.status(400).json({ error: 'All fields (doctorId, patientId, date, time, reason) are required' });
    }

    if (isNaN(new Date(date))) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    
    const timeRegex = /^([0-9]{2}):([0-9]{2})$/;
    if (!time.match(timeRegex)) {
        return res.status(400).json({ error: 'Invalid time format. Use HH:MM' });
    }

    try {
        const appointment = new Appointment({
            doctor: doctorId,
            patient: patientId,
            date: new Date(date),
            time: time,
            reason: reason
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Error creating appointment' });
    }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('doctor').populate('patient');
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Error fetching appointments' });
    }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findById(id).populate('doctor').populate('patient');
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        console.error('Error fetching appointment by ID:', error);
        res.status(500).json({ error: 'Error fetching appointment' });
    }
};

// Update appointment by ID
exports.updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { date, time, reason } = req.body;

    // Validation for update
    if (!date && !time && !reason) {
        return res.status(400).json({ error: 'At least one field (date, time, or reason) is required to update' });
    }

    if (date && isNaN(new Date(date))) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    if (time && !time.match(/^([0-9]{2}):([0-9]{2})$/)) {
        return res.status(400).json({ error: 'Invalid time format. Use HH:MM' });
    }

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { date: date ? new Date(date) : undefined, time: time, reason: reason },
            { new: true }
        );
        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json(updatedAppointment);
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ error: 'Error updating appointment' });
    }
};

// This is the functin to Delete appointment by ID
exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ error: 'Error deleting appointment' });
    }
};


// const Appointment = require('../models/appointment');

// // Create a new appointment
// exports.createAppointment = async (req, res) => {
//     const { doctorId, patientId, date, time, reason } = req.body;

//     try {
//         const appointment = new Appointment({
//             doctor: doctorId,
//             patient: patientId,
//             date: new Date(date),
//             time: time,
//             reason: reason
//         });

//         await appointment.save();
//         res.status(201).json(appointment);
//     } catch (error) {
//         console.error('Error creating appointment:', error);
//         res.status(500).json({ error: 'Error creating appointment' });
//     }
// };

// // Get all appointments
// exports.getAllAppointments = async (req, res) => {
//     try {
//         const appointments = await Appointment.find().populate('doctor').populate('patient');
//         res.json(appointments);
//     } catch (error) {
//         console.error('Error fetching appointments:', error);
//         res.status(500).json({ error: 'Error fetching appointments' });
//     }
// };

// // Get appointment by ID
// exports.getAppointmentById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const appointment = await Appointment.findById(id).populate('doctor').populate('patient');
//         if (!appointment) {
//             return res.status(404).json({ error: 'Appointment not found' });
//         }
//         res.json(appointment);
//     } catch (error) {
//         console.error('Error fetching appointment by ID:', error);
//         res.status(500).json({ error: 'Error fetching appointment' });
//     }
// };

// // Update appointment by ID
// exports.updateAppointment = async (req, res) => {
//     const { id } = req.params;
//     const { date, time, reason } = req.body;

//     try {
//         const updatedAppointment = await Appointment.findByIdAndUpdate(
//             id,
//             { date: new Date(date), time: time, reason: reason },
//             { new: true }
//         );
//         if (!updatedAppointment) {
//             return res.status(404).json({ error: 'Appointment not found' });
//         }
//         res.json(updatedAppointment);
//     } catch (error) {
//         console.error('Error updating appointment:', error);
//         res.status(500).json({ error: 'Error updating appointment' });
//     }
// };

// // Delete appointment by ID
// exports.deleteAppointment = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedAppointment = await Appointment.findByIdAndDelete(id);
//         if (!deletedAppointment) {
//             return res.status(404).json({ error: 'Appointment not found' });
//         }
//         res.json({ message: 'Appointment deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting appointment:', error);
//         res.status(500).json({ error: 'Error deleting appointment' });
//     }
// };
