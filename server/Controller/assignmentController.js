const Assignment = require("../Model/Assignment");

exports.postCreateAssignment = async (req, res) => {
    try {
        const assignment = new Assignment({
            ...req.body,
            createdBy: req.user?.id || req.body.createdBy
        });
        await assignment.save();
        res.status(201).json({ message: "Assignment created", assignment });
    } catch (err) {
        res.status(500).json({ message: "Error creating assignment", error: err.message });
    }
};

exports.getAssignmentsByCourse = async (req, res) => {
    try {
        const assignments = await Assignment.find({ courseId: req.params.courseId });
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching assignments", error: err.message });
    }
};
