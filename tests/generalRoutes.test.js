const request = require('supertest');
const app = require('../server.js'); // Adjust the path to your app file
const assert = require('assert');

describe('General Routes', function() {
    this.timeout(10000); // Increase timeout to 10 seconds

    describe('GET /login', () => {
        it('should return the login page', (done) => {
            request(app)
                .get('/login')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(res.text); // Log the response text
                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('should login the user', (done) => {
            const loginData = {
                email: 'testuser@example.com',
                password: 'testpassword',
                type: 'Patient'
            };
            request(app)
                .post('/login')
                .send(loginData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(res.body); // Log the response body
                    assert.strictEqual(res.body.message, 'Login successful');
                    done();
                });
        });
    });

    describe('GET /register', () => {
        it('should return the registration page', (done) => {
            request(app)
                .get('/register')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(res.text); // Log the response text
                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('should register the user', (done) => {
            const registerData = {
                email: 'newuser@example.com',
                password: 'newpassword',
                name: 'New User'
            };
            request(app)
                .post('/register')
                .send(registerData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(res.body); // Log the response body
                    assert.strictEqual(res.body.message, 'Registration successful');
                    done();
                });
        });
    });

    describe('GET /logout', () => {
        it('should log out the user', (done) => {
            request(app)
                .get('/logout')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(res.text); // Log the response text
                    done();
                });
        });
    });
});