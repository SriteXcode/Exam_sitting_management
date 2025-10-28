const xlsx = require('xlsx');
const fs = require('fs');

const dir = './tests/test-data';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const students = [
    { name: 'John Doe', department: 'Computer Science', rollno: '123', enrollment_no: 'E123' },
    { name: 'Jane Doe', department: 'Computer Science', rollno: '124', enrollment_no: 'E124' },
];

const worksheet = xlsx.utils.json_to_sheet(students);
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, 'Students');

xlsx.writeFile(workbook, './tests/test-data/students.xlsx');
