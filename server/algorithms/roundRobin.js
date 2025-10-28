const roundRobin = (invigilators, halls) => {
    const assignments = new Map();
    if (invigilators.length === 0 || halls.length === 0) {
        return assignments;
    }

    let invigilatorIndex = 0;
    halls.forEach(hall => {
        assignments.set(hall._id.toString(), invigilators[invigilatorIndex]);
        invigilatorIndex = (invigilatorIndex + 1) % invigilators.length;
    });

    return assignments;
};

module.exports = roundRobin;
