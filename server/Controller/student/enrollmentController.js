const Enrollment = require("../../Model/studentModels/EnrollmentModel");

// ✅ Enroll in a course
exports.enrollCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        // Check if already enrolled
        const exist = await Enrollment.findOne({ studentId, courseId });
        if (exist) return res.status(400).json({ message: "Already enrolled in this course" });

        const newEnroll = new Enrollment({ studentId, courseId });
        await newEnroll.save();

        res.status(201).json({ message: "Enrolled successfully", enrollment: newEnroll });
    } catch (err) {
        res.status(500).json({ message: "Error enrolling", error: err.message });
    }
};

// ✅ Get all enrolled courses for a student
exports.getMyCourses = async (req, res) => {
    try {
        const { studentId } = req.params;

        const enrollments = await Enrollment.find({ studentId }).populate("courseId");

        res.status(200).json({ courses: enrollments.map(e => e.courseId) });
    } catch (err) {
        res.status(500).json({ message: "Error fetching courses", error: err.message });
    }
};
