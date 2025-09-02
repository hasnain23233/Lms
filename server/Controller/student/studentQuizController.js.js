const Enrollment = require("../../Model/studentModels/EnrollmentModel");
const Quiz = require("../../Model/Quiz");

// ✅ Student ke enrolled courses ke quizzes
exports.getQuizzesForStudent = async (req, res) => {
    try {
        const studentId = req.user.id;

        // Find enrolled courses
        const enrollments = await Enrollment.find({ studentId }).select("courseId");
        const courseIds = enrollments.map(e => e.courseId);

        if (courseIds.length === 0) {
            return res.status(200).json({ quizzes: [] }); // agar koi enroll nai hai
        }

        // Find quizzes for only those courses
        const quizzes = await Quiz.find({ courseId: { $in: courseIds } })
            .populate("courseId", "title description") // sirf needed fields
            .populate("createdBy", "name email");

        res.json({ quizzes });
    } catch (err) {
        res.status(500).json({ message: "Error fetching student quizzes", error: err.message });
    }
};
