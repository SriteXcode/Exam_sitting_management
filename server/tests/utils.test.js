const { formatDate } = require('../utils/helpers');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { generateToken } = require('../utils/token');
const jwt = require('jsonwebtoken');
process.env.JWT_SECRET = 'test_secret';

describe('Utils', () => {
    describe('helpers', () => {
        it('should format a date', () => {
            const date = new Date('2024-01-01');
            expect(formatDate(date)).toBe('1/1/2024');
        });
    });

    describe('responseHandler', () => {
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        it('should send a success response', () => {
            successResponse(res, { data: 'test' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, data: { data: 'test' } });
        });

        it('should send an error response', () => {
            errorResponse(res, 'error');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: 'error' });
        });
    });

    describe('token', () => {
        it('should generate a JWT token', () => {
            const user = { _id: '123', role: 'admin' };
            const token = generateToken(user);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            expect(decoded.id).toBe('123');
            expect(decoded.role).toBe('admin');
        });
    });
});
