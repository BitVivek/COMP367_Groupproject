const { getIndex, getLogin, postLogin, getRegister, postRegister, getLogout, getResetUser, postResetUser } = require('../controllers/generalController');
const patientController = require('../controllers/patientController');
const alertMessage = require('../helpers/alertMessage');
const doctorController = require('../controllers/doctorController');

jest.mock('../helpers/alertMessage');
jest.mock('../controllers/patientController');

describe('General Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
        };
        res = {
            locals: { user: null },
            render: jest.fn(),
            status: jest.fn(() => res),
            clearCookie: jest.fn(),
        };
    });

    test('getIndex renders the index page', async () => {
        await getIndex(req, res);
        expect(res.render).toHaveBeenCalledWith('index', { title: 'Home', message: undefined, user: null });
    });

    test('getLogin renders the login page', async () => {
        await getLogin(req, res);
        expect(res.render).toHaveBeenCalledWith('login', { title: 'Login', message: undefined, user: null });
    });

    // test('postLogin handles missing fields', async () => {
    //     await postLogin(req, res);
    //     expect(alertMessage.alertMessage).toHaveBeenCalledWith('error', 'Login Failed!', 'Fields are missing');
    //     expect(res.status).toHaveBeenCalledWith(400);
    //     expect(res.render).toHaveBeenCalledWith('login', expect.objectContaining({ message: expect.anything() }));
    // });

    test('postLogin calls patientController when type is Patient', async () => {
        req.body = { email: 'test@example.com', password: 'password', type: 'Patient' };
        await postLogin(req, res);
        expect(patientController.checkLogin).toHaveBeenCalledWith(req, res);
    });

    test('getRegister renders the register page', async () => {
        await getRegister(req, res);
        expect(res.render).toHaveBeenCalledWith('register', { title: 'Register', message: undefined, user: null });
    });

    // test('postRegister handles missing fields', async () => {
    //     await postRegister(req, res);
    //     expect(alertMessage.alertMessage).toHaveBeenCalledWith('error', 'Register Failed', 'Fields are missing');
    //     expect(res.status).toHaveBeenCalledWith(400);
    //     expect(res.render).toHaveBeenCalledWith('register', expect.objectContaining({ message: expect.anything() }));
    // });

    test('postRegister calls patientController.createPatient', async () => {
        req.body = { email: 'test@example.com', password: 'password', name: 'John Doe' };
        await postRegister(req, res);
        expect(patientController.createPatient).toHaveBeenCalledWith(req, res);
    });

    test('getLogout clears cookies and renders login', async () => {
        await getLogout(req, res);
        expect(res.clearCookie).toHaveBeenCalledWith('jwt');
        expect(res.render).toHaveBeenCalledWith('login');
    });

    test('getResetUser renders the reset password page', async () => {
        await getResetUser(req, res);
        expect(res.render).toHaveBeenCalledWith('reset_password', { title: 'Recover password', message: undefined, user: null });
    });

    // test('postResetUser handles missing fields', async () => {
    //     await postResetUser(req, res);
    //     expect(alertMessage.alertMessage).toHaveBeenCalledWith('error', 'Recover Failed!', 'Fields are missing');
    //     expect(res.status).toHaveBeenCalledWith(400);
    //     expect(res.render).toHaveBeenCalledWith('reset_password', expect.objectContaining({ message: expect.anything() }));
    // });

    test('postResetUser calls patientController.resetPassword when type is Patient', async () => {
        req.body = { email: 'test@example.com', password: 'password', type: 'Patient' };
        await postResetUser(req, res);
        expect(patientController.resetPassword).toHaveBeenCalledWith(req, res);
    });
});

