const express = require('express')
const router = express.Router();
const techerController = require('../Controller/techerController');

router.get('/all-courses', techerController.getAllCourses);

router.post('/add-course', techerController.postAddCourse);

router.put('/update-course/:id', techerController.updateCourse);

router.delete('/delete-course/:id', techerController.deleteCourse);

module.exports = router;