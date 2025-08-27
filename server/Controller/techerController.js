const AddingCourse = require('../Model/TeacherModel');

// ✅ Get All Courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await AddingCourse.find();
        return res.status(200).json({ courses });
    } catch (err) {
        console.error("Error fetching courses:", err.message);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// ✅ Add Course
exports.postAddCourse = async (req, res) => {
    try {
        const { title, description, category, duration, price, youtubeLink, author } = req.body;

        const newCourse = new AddingCourse({
            title,
            description,
            category,
            duration,
            price,
            youtubeLink,
            author
        });

        const savedCourse = await newCourse.save();

        return res.status(201).json({
            message: "Course added successfully",
            course: savedCourse
        });

    } catch (err) {
        console.error("Error adding course:", err.message);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// ✅ Update Course
exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const updateData = req.body;

        const updatedCourse = await AddingCourse.findByIdAndUpdate(courseId, updateData, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (err) {
        console.error("Error updating course:", err.message);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// ✅ Delete Course
exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const deletedCourse = await AddingCourse.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (err) {
        console.error("Error deleting course:", err.message);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
