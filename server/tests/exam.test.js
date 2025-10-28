const request = require('supertest');
const express = require('express');
const examRoutes = require('../routes/examRoutes');
const Exam = require('../models/Exam');
const Department = require('../models/Department');
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
app.use('/api/exams', examRoutes);

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

describe('Exam Endpoints', () => {
    it('should get all exams', async () => {
        const department = new Department({ name: 'Computer Science' });
        await department.save();
        const exam = new Exam({ name: 'Midterm', department: department._id });
        await exam.save();

        const res = await request(app).get('/api/exams');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toHaveProperty('name', 'Midterm');
    });

    it('should create a new exam', async () => {
        const department = new Department({ name: 'Computer Science' });
        await department.save();

        const res = await request(app)
            .post('/api/exams')
            .send({
                name: 'Final Exam',
                department: department._id
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name', 'Final Exam');
    });

    it('should get an exam by id', async () => {
        const department = new Department({ name: 'Computer Science' });
        await department.save();
        const exam = new Exam({ name: 'Midterm', department: department._id });
        await exam.save();

        const res = await request(app).get(`/api/exams/${exam._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Midterm');
    });

    it('should update an exam', async () => {
        const department = new Department({ name: 'Computer Science' });
        await department.save();
        const exam = new Exam({ name: 'Midterm', department: department._id });
        await exam.save();

        const res = await request(app)
            .put(`/api/exams/${exam._id}`)
            .send({
                name: 'Final Exam'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Final Exam');
    });

    it('should delete an exam', async () => {
        const department = new Department({ name: 'Computer Science' });
        await department.save();
        const exam = new Exam({ name: 'Midterm', department: department._id });
        await exam.save();

        const res = await request(app).delete(`/api/exams/${exam._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Exam deleted successfully');
    });
});
