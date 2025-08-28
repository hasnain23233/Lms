const Quiz = require("../Model/Quiz");

exports.postCreateQuiz = async (req, res) => {
    console.log("Request body:", req.body);
    try {
        const { title, courseId, questions, createdBy } = req.body;

        // Temporary fallback if createdBy is missing
        let teacherId = createdBy;
        if (!teacherId) {
            // Fallback: try getting from req.headers.userId (frontend can send logged-in teacher id)
            teacherId = req.headers.userid;
        }

        if (!title || !courseId || !questions?.length || !teacherId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const quiz = new Quiz({
            title,
            courseId,
            questions,
            createdBy: teacherId, // use resolved teacher id
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
