const Enrollment = require("../../Model/studentModels/EnrollmentModel");
const Quiz = require("../../Model/Quiz");
const QuizAttempt = require("../../Model/studentModels/QuizAttemptModel");

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

exports.attemptQuiz = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { quizId } = req.params;
        const { answers } = req.body;  // [{ questionId, selectedOption }]

        // quiz le aao
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        let score = 0;

        quiz.questions.forEach((q, index) => {
            const studentAnswer = answers.find(a => a.questionId == q._id);
            if (studentAnswer && studentAnswer.selectedOption === q.correctAnswer) {
                score++;
            }
        });

        // save attempt
        const attempt = new QuizAttempt({
            studentId,
            quizId,
            answers,
            score,
            total: quiz.questions.length,
        });

        await attempt.save();

        res.json({ message: "Quiz submitted successfully", score, total: quiz.questions.length });
    } catch (err) {
        res.status(500).json({ message: "Error submitting quiz", error: err.message });
    }
};
