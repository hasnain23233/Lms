import React, { useEffect, useState } from "react";
import { useTecherStore } from "../store/techerStore";

const HandleCourses = () => {
    const { courses, fetchCourses, deleteCourse, updateCourse } = useTecherStore();
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        duration: "",
        price: "",
        youtubeLink: "",
        author: "",
    });
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    };

    const handleEditClick = (course) => {
        setEditingCourse(course._id);
        setFormData({
            title: course.title,
            description: course.description,
            category: course.category,
            duration: course.duration,
            price: course.price,
            youtubeLink: course.youtubeLink,
            author: course.author,
        });
    };

    const handleUpdateCourse = async () => {
        const result = await updateCourse(editingCourse, formData);
        if (result.success) {
            showMessage("success", result.message || "Course updated successfully!");
            setEditingCourse(null);
        } else {
            showMessage("error", result.message || "Failed to update course!");
        }
    };

    const handleDeleteCourse = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            const result = await deleteCourse(id);
            if (result.success) {
                showMessage("success", result.message || "Course deleted successfully!");
            } else {
                showMessage("error", result.message || "Failed to delete course!");
            }
        }
    };

    return (
        <div className="p-6 bg-gray-800 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-8 text-yellow-400">📚 Manage Courses</h1>

            {/* Message bar */}
            {message.text && (
                <div
                    className={`mb-4 p-3 rounded-xl text-white ${message.type === "success" ? "bg-green-600" : "bg-red-600"
                        }`}
                >
                    {message.text}
                </div>
            )}

            {/* Courses List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length === 0 ? (
                    <p className="text-gray-300">No courses available</p>
                ) : (
                    courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-gray-500 shadow-lg rounded-2xl p-5 border border-gray-400 hover:shadow-2xl transition"
                        >
                            <h2 className="text-xl font-semibold text-yellow-400">
                                {course.title}
                            </h2>
                            <p className="text-sm text-gray-200 mt-1 line-clamp-2">
                                {course.description}
                            </p>

                            <div className="mt-3 space-y-1 text-sm">
                                <p>
                                    <span className="font-medium text-yellow-300">Category:</span>{" "}
                                    {course.category}
                                </p>
                                <p>
                                    <span className="font-medium text-yellow-300">Duration:</span>{" "}
                                    {course.duration}
                                </p>
                                <p>
                                    <span className="font-medium text-yellow-300">Price:</span> $
                                    {course.price}
                                </p>
                                <p>
                                    <span className="font-medium text-yellow-300">Author:</span>{" "}
                                    {course.author}
                                </p>
                            </div>

                            <a
                                href={course.youtubeLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-yellow-300 underline block mt-3 text-sm hover:text-yellow-200"
                            >
                                ▶ Watch on YouTube
                            </a>

                            <div className="flex gap-3 mt-5">
                                <button
                                    onClick={() => handleEditClick(course)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition"
                                >
                                    ✏ Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteCourse(course._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Edit Modal */}
            {editingCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-gray-500 p-6 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-400">
                        <h2 className="text-2xl font-bold mb-4 text-yellow-400">✏ Edit Course</h2>
                        <div className="space-y-3">
                            {Object.keys(formData).map((key) => (
                                <input
                                    key={key}
                                    type="text"
                                    placeholder={key}
                                    value={formData[key]}
                                    onChange={(e) =>
                                        setFormData({ ...formData, [key]: e.target.value })
                                    }
                                    className="w-full border border-gray-400 bg-gray-700 text-white rounded-xl px-3 py-2 focus:ring-2 focus:ring-yellow-400"
                                />
                            ))}
                        </div>
                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => setEditingCourse(null)}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateCourse}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HandleCourses;
