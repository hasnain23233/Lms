const express = require("express");
const router = express.Router();
const studentQuizController = require("../../Controller/student/studentQuizController.js");
const { verifyToken } = require("../../middleware/authMiddleware.js");

router.get("/me", verifyToken, studentQuizController.getQuizzesForStudent);

module.exports = router;
