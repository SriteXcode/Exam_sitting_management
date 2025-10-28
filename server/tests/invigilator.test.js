const request = require('supertest');
const express = require('express');
const invigilatorRoutes = require('../routes/invigilatorRoutes');
const Invigilator = require('../models/Invigilator');
const mongoose = require('mongoose');
const { protect, authorize } = require('../middleware/authMiddleware');

jest.mock('../middleware/authMiddleware', () => ({
    protect: jest.fn((req, res, next) => {
        req.user = { role: 'admin' };
        next();
    }),
    authorize: jest.fn(() => (req, res, next) => next()),
}));

const app = express();
app.use(express.json());
app.use('/api/invigilators', invigilatorRoutes);

beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/test_db';
    await mongoose.connect(url, { useNewUrlParser: true });
});





afterAll(async () => {
    await mongoose.connection.close();
});

afterEach(async () => {
    await Invigilator.deleteMany();
});

describe('Invigilator Endpoints', () => {
    it('should get all invigilators', async () => {
        const invigilator = new Invigilator({ name: 'Dr. Test', email: 'test@example.com' });
        await invigilator.save();

        const res = await request(app).get('/api/invigilators');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toHaveProperty('name', 'Dr. Test');
    });

    it('should create a new invigilator', async () => {
        const res = await request(app)
            .post('/api/invigilators/add')
            .send({
                name: 'Prof. New',
                email: 'new@example.com'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name', 'Prof. New');
    });

    it('should update invigilator availability', async () => {
        const invigilator = new Invigilator({ name: 'Dr. Test', email: 'test@example.com' });
        await invigilator.save();

        const res = await request(app)
            .put(`/api/invigilators/availability/${invigilator._id}`)
            .send({
                isAvailable: false
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('isAvailable', false);
    });
});
