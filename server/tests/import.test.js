const request = require('supertest');
const express = require('express');
const importRoutes = require('../routes/importRoutes');
const Student = require('../models/Student');
const Department = require('../models/Department');
const mongoose = require('mongoose');
const { protect, authorize } = require('../middleware/authMiddleware');
const multer = require('multer');

jest.mock('../middleware/authMiddleware', () => ({
    protect: jest.fn((req, res, next) => {
        req.user = { role: 'admin' };
        next();
    }),
    authorize: jest.fn(() => (req, res, next) => next()),
}));

const app = express();
app.use(express.json());
app.use('/api/import', importRoutes);

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



describe('Import Endpoints', () => {
    it('should import students from an Excel file', async () => {
        const res = await request(app)
            .post('/api/import')
            .attach('file', './tests/test-data/students.xlsx');
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Students imported successfully');
    });

    it('should return an error if no file is uploaded', async () => {
        const res = await request(app).post('/api/import');
        expect(res.statusCode).toEqual(400);
        expect(res.text).toBe('No file uploaded.');
    });

    it('should return an error if the Excel file has missing fields', async () => {
        const res = await request(app)
            .post('/api/import')
            .attach('file', './tests/test-data/students-missing-fields.xlsx');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Missing required fields in the Excel file.');
    });

    it('should return an error if a student already exists', async () => {
        await Student.create({ name: 'John Doe', studentId: '123', enrollmentNo: 'E123', username: 'testuser' });
        const res = await request(app)
            .post('/api/import')
            .attach('file', './tests/test-data/students.xlsx');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Student with roll number 123 or enrollment number E123 already exists.');
    });
});
