const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    answers: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz.questions" },
            selectedOption: String
        }
    ],
    score: Number,
    total: Number,
}, { timestamps: true });

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
