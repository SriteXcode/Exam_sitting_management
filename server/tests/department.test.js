const request = require('supertest');
const express = require('express');
const departmentRoutes = require('../routes/departmentRoutes');
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
app.use('/api/departments', departmentRoutes);

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
    await Department.deleteMany();
});

afterEach(async () => {
    await Department.deleteMany();
});

describe('Department Endpoints', () => {
    it('should get all departments', async () => {
        const department = new Department({ name: 'Computer Science' });
        await department.save();

        const res = await request(app).get('/api/departments');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toHaveProperty('name', 'Computer Science');
    });

    it('should create a new department', async () => {
        const res = await request(app)
            .post('/api/departments')
            .send({
                name: 'Mechanical Engineering'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name', 'Mechanical Engineering');
    });

    it('should update a department', async () => {
        const department = new Department({ name: 'Computer Science' });
        await department.save();

        const res = await request(app)
            .put(`/api/departments/${department._id}`)
            .send({
                name: 'Civil Engineering'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Civil Engineering');
    });

    it('should delete a department', async () => {
        const department = new Department({ name: 'Computer Science' });
        await department.save();

        const res = await request(app).delete(`/api/departments/${department._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Department deleted successfully');
    });
});
