const mongoose = require("mongoose");

const addingCourseSchema = new mongoose.Schema({
    courseTitle: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    youtubeLink: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AddingCourse", addingCourseSchema);
