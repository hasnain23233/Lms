const Enrollment = require("../../Model/studentModels/EnrollmentModel");
const Quiz = require("../../Model/Quiz");
const QuizAttempt = require("../../Model/studentModels/QuizAttemptModel");

// ✅ Student ke enrolled courses ke quizzes
exports.getQuizzesForStudent = async (req, res) => {
    try {
        const studentId = req.user.id;

        const enrollments = await Enrollment.find({ studentId }).select("courseId");
        const courseIds = enrollments.map(e => e.courseId);

        if (courseIds.length === 0) {
            return res.status(200).json({ quizzes: [] });
        }

        // Get quizzes
        const quizzes = await Quiz.find({ courseId: { $in: courseIds } })
            .populate("courseId", "title description")
            .populate("createdBy", "name email");

        // Get all attempts of this student
        const attempts = await QuizAttempt.find({ studentId }).select("quizId");
        const attemptedQuizIds = new Set(attempts.map(a => a.quizId.toString()));

        // Add attempted flag
        const quizzesWithFlag = quizzes.map(q => ({
            ...q.toObject(),
            attempted: attemptedQuizIds.has(q._id.toString())
        }));

        res.json({ quizzes: quizzesWithFlag });
    } catch (err) {
        res.status(500).json({ message: "Error fetching student quizzes", error: err.message });
    }
};


exports.attemptQuiz = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { quizId } = req.params;
        const { answers } = req.body;

        // 🔒 Check if already attempted
        const existingAttempt = await QuizAttempt.findOne({ studentId, quizId });
        if (existingAttempt) {
            return res.status(400).json({ message: "You have already attempted this quiz" });
        }

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        let score = 0;
        quiz.questions.forEach((q) => {
            const studentAnswer = answers.find(a => a.questionId == q._id);
            if (studentAnswer && studentAnswer.selectedOption === q.correctAnswer) {
                score++;
            }
        });

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


