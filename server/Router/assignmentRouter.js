const express = require("express");
const router = express.Router();
const assignmentController = require("../Controller/AssignmentController");

// Create Assignment
router.post("/create", assignmentController.createAssignment);

// Get all assignments by Course ID
router.get("/course/:courseId", assignmentController.getAssignmentsByCourse);

// Update Assignment
router.put("/update/:id", assignmentController.updateAssignment);

// Delete Assignment
router.delete("/delete/:id", assignmentController.deleteAssignment);

module.exports = router;
