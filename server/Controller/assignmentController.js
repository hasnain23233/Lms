const Assignment = require("../Model/Assignment");

// Create Assignment
exports.createAssignment = async (req, res) => {
    try {
        const assignment = new Assignment({
            ...req.body,
            createdBy: req.user?.id || req.body.createdBy // fallback if no auth
        });
        await assignment.save();
        res.status(201).json(assignment);
    } catch (err) {
        console.error("Assignment creation error:", err); // ✅ add this
        res.status(500).json({ message: "Error creating assignment", error: err.message });
    }
};

// Get assignments by course
exports.getAssignmentsByCourse = async (req, res) => {
    try {
        const assignments = await Assignment.find({ courseId: req.params.courseId }).sort({ createdAt: -1 });
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching assignments", error: err.message });
    }
};

exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().sort({ createdAt: -1 });
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching assignments", error: err.message });
    }
};

// Update assignment
exports.updateAssignment = async (req, res) => {
    try {
        const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Assignment not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Error updating assignment", error: err.message });
    }
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
    try {
        const deleted = await Assignment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Assignment not found" });
        res.json({ message: "Assignment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting assignment", error: err.message });
    }
};
