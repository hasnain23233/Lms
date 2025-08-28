
const express = require("express");
const router = express.Router();
const assignmentController = require('../Controller/AssignmentController');

router.post("/", assignmentController.postCreateAssignment);
router.get("/:courseId", assignmentController.getAssignmentsByCourse);

module.exports = router;
