const AddingCourse = require('../Model/TeacherModel')

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await AddingCourse.find();
        return res.status(200).json({ courses });
    } catch (err) {
        console.error("Error fetching courses:", err.message);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

exports.postAddCourse = async (req, res, next) => {
    try {
        console.log(req.body);
        const { courseTitle, description, category, duration, price, youtubeLink, author } = req.body;

        const newCourse = new AddingCourse({
            courseTitle,
            description,
            category,
            duration,
            price,
            youtubeLink,
            author
        });

        await newCourse.save();

        console.log('Course added successfully');
        return res.status(201).json({
            message: "Course added successfully",
            course: { courseTitle, description, category, duration, price, youtubeLink, author }
        });

    } catch (err) {
        console.error("Error adding course:", err.message);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}