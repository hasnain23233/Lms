const express = require("express");
const router = express.Router();
const quizController = require("../Controller/quizeController");

router.post("/", quizController.postCreateQuiz);
router.get("/:courseId", quizController.getQuizzesByCourse);

module.exports = router;