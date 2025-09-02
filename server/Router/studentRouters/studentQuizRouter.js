const express = require("express");
const router = express.Router();
const studentQuizController = require("../../Controller/student/studentQuizController.js");
const { verifyToken } = require("../../middleware/authMiddleware.js");

router.get("/me", verifyToken, studentQuizController.getQuizzesForStudent);

// Student attempts quiz
router.post("/attempt/:quizId", verifyToken, studentQuizController.attemptQuiz);


module.exports = router;
