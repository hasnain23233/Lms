const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    answers: [
        {
            questionId: { type: String, required: true }, // can be index or id
            selectedOption: { type: String, required: true },
            isCorrect: { type: Boolean, required: true }
        }
    ],
    score: { type: Number, required: true },
    attemptedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
