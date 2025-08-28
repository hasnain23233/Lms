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

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate("courseId").populate("createdBy", "email");
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching quizzes", error: err.message });
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

exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        res.json({ message: "Quiz deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting quiz", error: err.message });
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;

        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            { title, questions },
            { new: true, runValidators: true }
        );

        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        res.json({ message: "Quiz updated successfully", quiz });
    } catch (err) {
        res.status(500).json({ message: "Error updating quiz", error: err.message });
    }
};
