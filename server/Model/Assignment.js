const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddingCourse",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);
