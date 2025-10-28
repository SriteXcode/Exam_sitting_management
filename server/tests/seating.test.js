const request = require('supertest');
const express = require('express');
const seatingRoutes = require('../routes/seatingRoutes');
const SeatingPlan = require('../models/SeatingPlan');
const Student = require('../models/Student');
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
app.use('/api/seating', seatingRoutes);

beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/test_db';
    await mongoose.connect(url, { useNewUrlParser: true });
});

beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
});





afterAll(async () => {
    await mongoose.connection.close();
});

afterEach(async () => {
    await SeatingPlan.deleteMany();
    await Student.deleteMany();
    await ExamHall.deleteMany();
});

afterEach(async () => {
    await SeatingPlan.deleteMany();
    await Student.deleteMany();
    await ExamHall.deleteMany();
});

describe('Seating Endpoints', () => {
    it('should create a seating plan', async () => {
        const hall = new ExamHall({ name: 'Test Hall', capacity: 50 });
        await hall.save();
        const student = new Student({ name: 'Test Student', studentId: 'S001', enrollmentNo: 'E001', username: 'testuser' });
        await student.save();

        const res = await request(app).post('/api/seating/add');
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });
});
