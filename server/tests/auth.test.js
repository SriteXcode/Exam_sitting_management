const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/authRoutes');
const User = require('../models/User');
const mongoose = require('mongoose');
process.env.JWT_SECRET = 'test_secret';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/test_db';
    await mongoose.connect(url, { useNewUrlParser: true });
});





afterAll(async () => {
    await mongoose.connection.close();
});

afterEach(async () => {
    await User.deleteMany();
});

describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password',
                role: 'staff'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should login an existing user', async () => {
        const user = new User({ username: 'testuser', password: 'password', role: 'staff' });
        await user.save();

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
