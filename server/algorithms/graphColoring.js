const graphColoring = (subjects, students) => {
    const adj = new Map();
    subjects.forEach(subject => adj.set(subject._id.toString(), []));

    students.forEach(student => {
        for (let i = 0; i < student.subjects.length; i++) {
            for (let j = i + 1; j < student.subjects.length; j++) {
                const sub1 = student.subjects[i].toString();
                const sub2 = student.subjects[j].toString();
                if (!adj.get(sub1).includes(sub2)) {
                    adj.get(sub1).push(sub2);
                }
                if (!adj.get(sub2).includes(sub1)) {
                    adj.get(sub2).push(sub1);
                }
            }
        }
    });

    const colors = new Map();
    let colorCount = 0;

    subjects.forEach(subject => {
        const subjectId = subject._id.toString();
        const usedColors = new Set();
        adj.get(subjectId).forEach(neighbor => {
            if (colors.has(neighbor)) {
                usedColors.add(colors.get(neighbor));
            }
        });

        let color = 0;
        while (usedColors.has(color)) {
            color++;
        }
        colors.set(subjectId, color);
        if (color > colorCount) {
            colorCount = color;
        }
    });

    return { colors, colorCount: colorCount + 1 };
};

module.exports = graphColoring;
