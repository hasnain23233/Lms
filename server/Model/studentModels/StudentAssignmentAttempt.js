const mongoose = require("mongoose");

const studentAssignmentAttemptSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
    submittedAt: { type: Date, default: Date.now },
    content: { type: String }, // text, link, or file reference
}, { timestamps: true });

module.exports = mongoose.model("StudentAssignmentAttempt", studentAssignmentAttemptSchema);
