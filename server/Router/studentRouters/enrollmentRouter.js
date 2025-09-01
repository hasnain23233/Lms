const express = require("express");
const router = express.Router();
const enrollmentController = require("../../Controller/student/enrollmentController");
const { verifyToken } = require("../../middleware/authMiddleware");
// Student enrolls in a course (token se student nikalna)
router.post("/enroll", verifyToken, enrollmentController.enrollCourse);

// Get all enrolled courses for a student
router.get("/my-courses", verifyToken, enrollmentController.getMyCourses);

module.exports = router;
