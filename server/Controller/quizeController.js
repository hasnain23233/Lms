const Quiz = require("../Model/Quiz");


exports.postCreateQuiz = async (req, res) => {
    try {
        const { title, courseId, questions } = req.body;

        // ✅ Teacher ID from verified token
        const teacherId = req.user?.id;

        if (!title || !courseId || !questions?.length || !teacherId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const quiz = new Quiz({
            title,
            courseId,
            questions,
            createdBy: teacherId, // must be ObjectId
        });

        await quiz.save();
        res.status(201).json({ message: "Quiz created", quiz });
    } catch (err) {
        console.error("Error creating quiz:", err);
        res.status(500).json({ message: "Error creating quiz", error: err.message });
    }
};

exports.getQuizzesByCourse = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ courseId: req.params.courseId });
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching quizzes", error: err.message });
    }
};
