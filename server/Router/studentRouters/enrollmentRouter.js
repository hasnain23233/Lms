const express = require("express");
const router = express.Router();
const enrollmentController = require("../../Controller/student/enrollmentController");

// Student enrolls in a course
router.post("/enroll", enrollmentController.enrollCourse);

// Get all enrolled courses for a student
router.get("/my-courses/:studentId", enrollmentController.getMyCourses);

module.exports = router;
