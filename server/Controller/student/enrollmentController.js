const Enrollment = require("../../Model/studentModels/EnrollmentModel");

// ✅ Enroll in a course
exports.enrollCourse = async (req, res) => {
    try {
        const studentId = req.user.id;  // token se nikal liya
        const { courseId } = req.body;
        console.log("Enroll request received:", { studentId, courseId });

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
        const studentId = req.user.id; // token se user id
        const enrollments = await Enrollment.find({ studentId }).populate("courseId");

        res.status(200).json({ courses: enrollments.map(e => e.courseId) });
    } catch (err) {
        res.status(500).json({ message: "Error fetching courses", error: err.message });
    }
};
