const alertMessage = require('../helpers/alertMessage');
const patientController = require('../controllers/patientController');
const doctorController = require('../controllers/doctorController');

exports.getIndex = async (req, res) => {
    console.log('GET /index');
    const data = { title: 'Home', message: undefined, user: res.locals.user };
    res.render('index', data);
};

exports.getLogin = async (req, res) => {
    console.log('GET /login');
    const data = { title: 'Login', message: undefined, user: res.locals.user };
    res.render('login', data);
};

exports.postLogin = async (req, res) => {
    console.log('POST /login');
    const data = { title: 'Login', message: undefined, user: res.locals.user };
    if (!req.body.email || !req.body.password || !req.body.type) {
        data.message = alertMessage.alertMessage('error', 'Login Failed!', 'Fields are missing');
        return res.status(400).render('login', data);
    }
    if (req.body.type === 'Patient') {
        return patientController.checkLogin(req, res);
    }
    res.render('login');
};

exports.getRegister = async (req, res) => {
    console.log('GET /register');
    const data = { title: 'Register', message: undefined, user: res.locals.user };
    res.render('register', data);
};

exports.postRegister = async (req, res) => {
    console.log('POST /register');
    const data = { title: 'Register', message: undefined, user: res.locals.user };
    if (!req.body.email || !req.body.password || !req.body.name) {
        data.message = alertMessage.alertMessage('error', 'Register Failed', 'Fields are missing');
        return res.status(400).render('register', data);
    }
    return patientController.createPatient(req, res);
};

exports.getLogout = async (req, res) => {
    console.log('GET /logout');
    res.clearCookie('jwt');
    res.render('login');
};

exports.getResetUser = async (req, res) => {
    console.log('GET /reset_password');
    const data = { title: 'Recover password', message: undefined, user: res.locals.user };
    res.render('reset_password', data);
};

exports.postResetUser = async (req, res) => {
    console.log('POST /reset_password');
    const data = { title: 'Recover password', message: undefined, user: res.locals.user };
    if (!req.body.email || !req.body.password || !req.body.type) {
        data.message = alertMessage.alertMessage('error', 'Recover Failed!', 'Fields are missing');
        return res.status(400).render('reset_password', data);
    }
    if (req.body.type === 'Patient') {
        return patientController.resetPassword(req, res);
    }
};