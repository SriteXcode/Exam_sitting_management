const SeatingPlan = require('../models/SeatingPlan');
const Student = require('../models/Student');
const ExamHall = require('../models/ExamHall');

const generatePrintableChart = async (examScheduleId) => {
  try {
    const plans = await SeatingPlan.find({ examSchedule: examScheduleId })
      .populate('student')
      .populate('hall');

    const hallMap = {};

    for (const plan of plans) {
      const hallName = plan.hall.name;
      if (!hallMap[hallName]) hallMap[hallName] = [];

      hallMap[hallName].push({
        seatNumber: plan.seatNumber,
        name: plan.student.name,
        roll: plan.student.rollNumber, // adjust as per your schema
      });
    }

    // Sort each hall’s seats by number (optional)
    for (const hall in hallMap) {
      hallMap[hall].sort((a, b) => {
        const aNum = parseInt(a.seatNumber.split('-')[1]);
        const bNum = parseInt(b.seatNumber.split('-')[1]);
        return aNum - bNum;
      });
    }

    return hallMap;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = generatePrintableChart;
