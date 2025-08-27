import React, { useState } from "react";
import { useTecherStore } from "../store/techerStore";

export default function AddCourses() {
    const { addCourse } = useTecherStore();

    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        category: "Programming",
        duration: "",
        price: "",
        image: null,
        youtubeLink: "",
        author: "",   // 🔹 Added Author
    });

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");

        if (!courseData.title || !courseData.description || !courseData.author) {
            setErrorMsg("Please fill all required fields!");
            setLoading(false);
            return;
        }

        try {
            await addCourse(courseData);
            setSuccessMsg("✅ Course added successfully!");
            setLoading(false);

            // Clear form
            setCourseData({
                title: "",
                description: "",
                category: "Programming",
                duration: "",
                price: "",
                youtubeLink: "",
                author: "",
            });
        } catch (error) {
            setErrorMsg("❌ Failed to add course!");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-800 flex items-center justify-center px-6 py-10">
            <div className="bg-gray-700 w-full max-w-4xl p-8 rounded-2xl shadow-2xl">
                <h1 className="text-2xl font-bold text-yellow-400 text-center mb-8">
                    Add New Course
                </h1>

                {/* Success/Error Messages */}
                {successMsg && (
                    <div className="bg-green-500 text-white text-center py-2 rounded mb-4">
                        {successMsg}
                    </div>
                )}
                {errorMsg && (
                    <div className="bg-red-500 text-white text-center py-2 rounded mb-4">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                    {/* Course Title */}
                    <div>
                        <label className="text-gray-300 mb-1 block">Course Title</label>
                        <input
                            type="text"
                            name="title"
                            value={courseData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter course title"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="text-gray-300 mb-1 block">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={courseData.author}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter author name"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-gray-300 mb-1 block">Description</label>
                        <textarea
                            name="description"
                            value={courseData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter course description"
                            required
                        ></textarea>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-gray-300 mb-1 block">Category</label>
                        <select
                            name="category"
                            value={courseData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        >
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="text-gray-300 mb-1 block">Duration (weeks)</label>
                        <input
                            type="number"
                            name="duration"
                            value={courseData.duration}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter course duration"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="text-gray-300 mb-1 block">Price (USD)</label>
                        <input
                            type="number"
                            name="price"
                            value={courseData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter price"
                            required
                        />
                    </div>

                    {/* YouTube Link */}
                    <div>
                        <label className="text-gray-300 mb-1 block">YouTube Link</label>
                        <input
                            type="url"
                            name="youtubeLink"
                            value={courseData.youtubeLink}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter YouTube course link"
                        />
                    </div>


                    {/* Submit */}
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-yellow-400 text-gray-800 py-3 px-8 rounded-xl font-bold hover:bg-yellow-300 transition duration-300 shadow-md"
                        >
                            {loading ? "Adding..." : "Add Course"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
