const Quiz = require("../models/Quiz");

exports.postCreateQuiz = async (req, res) => {
    try {
        const quiz = new Quiz({
            ...req.body,
            createdBy: req.user?.id || req.body.createdBy
        });
        await quiz.save();
        res.status(201).json({ message: "Quiz created", quiz });
    } catch (err) {
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
