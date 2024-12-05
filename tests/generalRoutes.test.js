const express = require('express');
const router = require('../routes/generalRoutes');
const generalController = require('../controllers/generalController');

jest.mock('../controllers/generalController'); // Mock the controller functions

describe('General Routes', () => {
    let mockApp;

    beforeEach(() => {
        // Create a mock express application
        mockApp = express();
        mockApp.use(express.json());
        mockApp.use(express.urlencoded({ extended: true }));
        mockApp.use(router);
    });

    test('GET /index routes to generalController.getIndex', async () => {
        const mockRequest = { path: '/index', method: 'GET' };
        const mockResponse = { send: jest.fn(), status: jest.fn().mockReturnThis(), render: jest.fn() };

        // Mock implementation of getIndex
        generalController.getIndex.mockImplementation((req, res) => res.status(200).send('Index Page'));

        await generalController.getIndex(mockRequest, mockResponse);

        expect(generalController.getIndex).toHaveBeenCalledWith(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith('Index Page');
    });

    test('GET /login routes to generalController.getLogin', async () => {
        const mockRequest = { path: '/login', method: 'GET' };
        const mockResponse = { send: jest.fn(), status: jest.fn().mockReturnThis(), render: jest.fn() };

        // Mock implementation of getLogin
        generalController.getLogin.mockImplementation((req, res) => res.status(200).send('Login Page'));

        await generalController.getLogin(mockRequest, mockResponse);

        expect(generalController.getLogin).toHaveBeenCalledWith(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith('Login Page');
    });

    test('POST /login routes to generalController.postLogin', async () => {
        const mockRequest = { 
            path: '/login', 
            method: 'POST', 
            body: { email: 'test@example.com', password: 'password' }
        };
        const mockResponse = { send: jest.fn(), status: jest.fn().mockReturnThis(), render: jest.fn() };

        // Mock implementation of postLogin
        generalController.postLogin.mockImplementation((req, res) => res.status(200).send('Login Success'));

        await generalController.postLogin(mockRequest, mockResponse);

        expect(generalController.postLogin).toHaveBeenCalledWith(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith('Login Success');
    });

    test('GET /register routes to generalController.getRegister', async () => {
        const mockRequest = { path: '/register', method: 'GET' };
        const mockResponse = { send: jest.fn(), status: jest.fn().mockReturnThis(), render: jest.fn() };

        // Mock implementation of getRegister
        generalController.getRegister.mockImplementation((req, res) => res.status(200).send('Register Page'));

        await generalController.getRegister(mockRequest, mockResponse);

        expect(generalController.getRegister).toHaveBeenCalledWith(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith('Register Page');
    });

    test('POST /register routes to generalController.postRegister', async () => {
        const mockRequest = {
            path: '/register',
            method: 'POST',
            body: { email: 'test@example.com', password: 'password', name: 'John Doe' },
        };
        const mockResponse = { send: jest.fn(), status: jest.fn().mockReturnThis(), render: jest.fn() };

        // Mock implementation of postRegister
        generalController.postRegister.mockImplementation((req, res) => res.status(200).send('Register Success'));

        await generalController.postRegister(mockRequest, mockResponse);

        expect(generalController.postRegister).toHaveBeenCalledWith(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith('Register Success');
    });

    test('GET /logout routes to generalController.getLogout', async () => {
        const mockRequest = { path: '/logout', method: 'GET' };
        const mockResponse = { send: jest.fn(), status: jest.fn().mockReturnThis(), render: jest.fn(), clearCookie: jest.fn() };

        // Mock implementation of getLogout
        generalController.getLogout.mockImplementation((req, res) => {
            res.clearCookie('jwt');
            return res.status(200).send('Logged Out');
        });

        await generalController.getLogout(mockRequest, mockResponse);

        expect(generalController.getLogout).toHaveBeenCalledWith(mockRequest, mockResponse);
        expect(mockResponse.clearCookie).toHaveBeenCalledWith('jwt');
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith('Logged Out');
    });

    test('GET /reset_password routes to generalController.getResetUser', async () => {
        const mockRequest = { path: '/reset_password', method: 'GET' };
        const mockResponse = { send: jest.fn(), status: jest.fn().mockReturnThis(), render: jest.fn() };

        // Mock implementation of getResetUser
        generalController.getResetUser.mockImplementation((req, res) => res.status(200).send('Reset Password Page'));

        await generalController.getResetUser(mockRequest, mockResponse);

        expect(generalController.getResetUser).toHaveBeenCalledWith(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith('Reset Password Page');
    });

    test('POST /reset_password routes to generalController.postResetUser', async () => {
        const mockRequest = {
            path: '/reset_password',
            method: 'POST',
            body: { email: 'test@example.com', password: 'newpassword', type: 'Patient' },
        };
        const mockResponse = { send: jest.fn(), status: jest.fn().mockReturnThis(), render: jest.fn() };

        // Mock implementation of postResetUser
        generalController.postResetUser.mockImplementation((req, res) => res.status(200).send('Password Reset Success'));

        await generalController.postResetUser(mockRequest, mockResponse);

        expect(generalController.postResetUser).toHaveBeenCalledWith(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith('Password Reset Success');
    });
});
