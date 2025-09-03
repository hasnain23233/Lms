const express = require("express");
const router = express.Router();
const { getAssignmentsForStudent, submitAssignment } = require("../../Controller/student/studentAssignmentController");
const { verifyToken } = require("../../middleware/authMiddleware");

// Get assignments for logged-in student
router.get("/me", verifyToken, getAssignmentsForStudent);

// Submit assignment
router.post("/submit/:assignmentId", verifyToken, submitAssignment);

module.exports = router;
