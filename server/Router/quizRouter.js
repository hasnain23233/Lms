const express = require("express");
const router = express.Router();
const quizController = require("../Controller/quizeController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, quizController.postCreateQuiz);
router.get("/:courseId", quizController.getQuizzesByCourse);
router.put("/:id", quizController.updateQuiz);
router.delete("/:id", quizController.deleteQuiz);


module.exports = router;