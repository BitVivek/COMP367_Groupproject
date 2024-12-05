const sinon = require('sinon');
const assert = require('assert');
const generalController = require('../controllers/generalController');
const patientController = require('../controllers/patientController');

describe('General Controller', function() {
    describe('getLogin', () => {
        it('should render the login page', async () => {
            const req = {};
            const res = {
                render: sinon.spy()
            };

            await generalController.getLogin(req, res);

            assert(res.render.calledOnce);
            assert(res.render.calledWith('login', { title: 'Login', message: undefined, user: undefined }));
        });
    });

    describe('postLogin', () => {
        it('should call patientController.checkLogin for Patient type', async () => {
            const req = {
                body: {
                    email: 'testuser@example.com',
                    password: 'testpassword',
                    type: 'Patient'
                }
            };
            const res = {
                render: sinon.spy()
            };
            const checkLoginStub = sinon.stub(patientController, 'checkLogin').resolves();

            await generalController.postLogin(req, res);

            assert(checkLoginStub.calledOnce);
            checkLoginStub.restore();
        });

        it('should render login page with error message if fields are missing', async () => {
            const req = {
                body: {
                    email: '',
                    password: '',
                    type: ''
                }
            };
            const res = {
                render: sinon.spy()
            };

            await generalController.postLogin(req, res);

            assert(res.render.calledOnce);
            assert(res.render.calledWith('login', sinon.match.has('message')));
        });
    });

    describe('getRegister', () => {
        it('should render the registration page', async () => {
            const req = {};
            const res = {
                render: sinon.spy()
            };

            await generalController.getRegister(req, res);

            assert(res.render.calledOnce);
            assert(res.render.calledWith('register', { title: 'Register', message: undefined, user: undefined }));
        });
    });

    describe('postRegister', () => {
        it('should call patientController.createPatient if fields are valid', async () => {
            const req = {
                body: {
                    email: 'newuser@example.com',
                    password: 'newpassword',
                    name: 'New User'
                }
            };
            const res = {
                render: sinon.spy()
            };
            const createPatientStub = sinon.stub(patientController, 'createPatient').resolves();

            await generalController.postRegister(req, res);

            assert(createPatientStub.calledOnce);
            createPatientStub.restore();
        });

        it('should render register page with error message if fields are missing', async () => {
            const req = {
                body: {
                    email: '',
                    password: '',
                    name: ''
                }
            };
            const res = {
                render: sinon.spy()
            };

            await generalController.postRegister(req, res);

            assert(res.render.calledOnce);
            assert(res.render.calledWith('register', sinon.match.has('message')));
        });
    });

    describe('getLogout', () => {
        it('should clear the jwt cookie and render the login page', async () => {
            const req = {};
            const res = {
                clearCookie: sinon.spy(),
                render: sinon.spy()
            };

            await generalController.getLogout(req, res);

            assert(res.clearCookie.calledOnce);
            assert(res.clearCookie.calledWith('jwt'));
            assert(res.render.calledOnce);
            assert(res.render.calledWith('login'));
        });
    });
});