const mongoose = require('mongoose');
const generateSeatingPlan = require('../algorithms/seatingGenerator');
const Department = require('../models/Department');
const Subject = require('../models/Subject');
const Student = require('../models/Student');
const ExamSchedule = require('../models/ExamSchedule');
const ExamHall = require('../models/ExamHall');
const SeatingPlan = require('../models/SeatingPlan');

// Mock data
let department;
let subject;
let student;
let schedule;
let hall;

beforeAll(async () => {
  // Replace with your in-memory MongoDB server setup if you have one
  await mongoose.connect('mongodb://localhost/test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Clean up database before tests
  await mongoose.connection.db.dropDatabase();

  department = await Department.create({ name: 'Computer Science' });
  subject = await Subject.create({ name: 'Data Structures', code: 'CS101', department: department._id });
  student = await Student.create({
    name: 'Test Student',
    rollNo: '123',
    studentId: 'S123',
    enrollmentNo: 'E123',
    username: 'teststudent',
    department: department._id,
    subjects: [subject._id],
    semester: 3,
  });
  schedule = await ExamSchedule.create({
    subject: subject._id,
    date: '2025-11-20',
    time: '10:00',
    semester: 3,
    department: 'Computer Science',
  });
  hall = await ExamHall.create({ name: 'Hall 1', capacity: 100 });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('generateSeatingPlan', () => {
  it('should generate a seating plan for a given schedule', async () => {
    const result = await generateSeatingPlan(schedule._id);

    expect(result.message).toBe('Seating plan generated successfully!');
    expect(result.count).toBe(1);

    const plan = await SeatingPlan.find({ examSchedule: schedule._id });
    expect(plan.length).toBe(1);
    expect(plan[0].student.toString()).toBe(student._id.toString());
  });
});

const graphColoring = require('../algorithms/graphColoring');
const roundRobin = require('../algorithms/roundRobin');
const harmonySearch = require('../algorithms/harmonySearch');

describe('Algorithms', () => {
    describe('graphColoring', () => {
        it('should color a simple graph', () => {
            const subjects = [{ _id: '1' }, { _id: '2' }];
            const students = [{ subjects: ['1', '2'] }];
            const { colors, colorCount } = graphColoring(subjects, students);
            expect(colorCount).toBe(2);
            expect(colors.get('1')).not.toBe(colors.get('2'));
        });
    });

    describe('roundRobin', () => {
        it('should assign invigilators in a round-robin fashion', () => {
            const invigilators = [{ _id: 'inv1' }, { _id: 'inv2' }];
            const halls = [{ _id: 'hall1' }, { _id: 'hall2' }, { _id: 'hall3' }];
            const assignments = roundRobin(invigilators, halls);
            expect(assignments.get('hall1')).toBe(invigilators[0]);
            expect(assignments.get('hall2')).toBe(invigilators[1]);
            expect(assignments.get('hall3')).toBe(invigilators[0]);
        });
    });

    describe('harmonySearch', () => {
        it('should optimize a seating plan', () => {
            const seatingPlan = { 'Hall A': [{ student: 's1', seatNumber: 1 }, { student: 's2', seatNumber: 2 }] };
            const students = [{ _id: 's1', subjects: ['math'] }, { _id: 's2', subjects: ['physics'] }];
            const subjects = [{ _id: 'math' }, { _id: 'physics' }];
            const optimizedPlan = harmonySearch(seatingPlan, students, subjects);
            expect(optimizedPlan).toBeDefined();
        });
    });
});
