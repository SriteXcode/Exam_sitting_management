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
