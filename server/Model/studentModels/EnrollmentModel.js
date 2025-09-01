const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "AddingCourse", required: true },
    enrolledAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
