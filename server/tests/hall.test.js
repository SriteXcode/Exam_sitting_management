const request = require('supertest');
const express = require('express');
hallRoutes = require('../routes/hallRoutes');
const ExamHall = require('../models/ExamHall');
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
app.use('/api/halls', hallRoutes);

beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/test_db';
    await mongoose.connect(url, { useNewUrlParser: true });
});





afterAll(async () => {
    await mongoose.connection.close();
});

afterEach(async () => {
    await ExamHall.deleteMany();
});

afterEach(async () => {
    await ExamHall.deleteMany();
});

describe('Hall Endpoints', () => {
it('should get all halls', async () => {
        await ExamHall.create({ name: 'Test Hall', capacity: 100 });
        const res = await request(app).get('/api/halls');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toHaveProperty('name', 'Test Hall');
    });

    it('should create a new hall', async () => {
        const res = await request(app)
            .post('/api/halls/add')
            .send({
                name: 'New Hall',
                capacity: 100
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name', 'New Hall');
    });
});
