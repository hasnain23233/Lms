const express = require('express')
const router = express.Router();
const techerController = require('../Controller/techerController');

router.get('/all-courses', techerController.getAllCourses);

router.post('/add-course', techerController.postAddCourse);

module.exports = router;