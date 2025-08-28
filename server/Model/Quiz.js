const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "AddingCourse", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, // Teacher
    questions: [
        {
            questionText: { type: String, required: true },
            options: { type: [String], required: true },
            correctAnswer: { type: String, required: true }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);