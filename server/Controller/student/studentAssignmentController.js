const Enrollment = require("../../Model/studentModels/EnrollmentModel");
const Assignment = require("../../Model/Assignment");
const StudentAssignmentAttempt = require("../../Model/studentModels/StudentAssignmentAttempt");

// ✅ Get assignments for enrolled courses
exports.getAssignmentsForStudent = async (req, res) => {
    try {
        const studentId = req.user.id;

        // Enrolled courses
        const enrollments = await Enrollment.find({ studentId }).select("courseId");
        const courseIds = enrollments.map(e => e.courseId);

        if (courseIds.length === 0) {
            return res.status(200).json({ assignments: [] });
        }

        // Assignments for enrolled courses
        const assignments = await Assignment.find({ courseId: { $in: courseIds } })
            .populate("courseId", "title description")
            .populate("createdBy", "name email")
            .sort({ dueDate: -1 });

        // Student submissions
        const attempts = await StudentAssignmentAttempt.find({ studentId }).select("assignmentId");
        const submittedAssignmentIds = new Set(attempts.map(a => a.assignmentId.toString()));

        const assignmentsWithFlag = assignments.map(a => ({
            ...a.toObject(),
            submitted: submittedAssignmentIds.has(a._id.toString())
        }));

        res.json({ assignments: assignmentsWithFlag });

    } catch (err) {
        res.status(500).json({ message: "Error fetching assignments", error: err.message });
    }
};
