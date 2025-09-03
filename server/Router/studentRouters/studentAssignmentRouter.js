const express = require("express");
const router = express.Router();
const { getAssignmentsForStudent } = require("../../Controller/student/studentAssignmentController");
const { verifyToken } = require("../../middleware/authMiddleware");

// Get assignments for logged-in student
router.get("/me", verifyToken, getAssignmentsForStudent);

module.exports = router;
