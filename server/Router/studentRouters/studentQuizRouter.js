const express = require("express");
const router = express.Router();
const studentQuizController = require("../Controller/studentControllers/studentQuizController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/me", verifyToken, studentQuizController.getQuizzesForStudent);

module.exports = router;
