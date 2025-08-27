import React, { useEffect } from "react";
import { useTecherStore } from "../store/techerStore";

const getEmbedUrl = (url) => {
    if (!url) return "";

    let videoId = "";

    if (url.includes("watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
    }
    else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }

    return `https://www.youtube.com/embed/${videoId}`;
};

export default function AllCourses() {
    const { courses, fetchCourses } = useTecherStore();

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return (
        <div className="bg-gray-800 min-h-screen py-10 px-6">
            <h1 className="text-4xl font-bold text-yellow-400 text-center mb-10">
                All Courses – Doroing LMS
            </h1>

            {courses.length === 0 ? (
                <p className="text-center text-gray-300">No courses available yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className="bg-gray-600 rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform"
                        >
                            {course.youtubeLink && (
                                <div className="mb-4">
                                    <iframe
                                        className="w-full h-52 rounded-lg"
                                        src={getEmbedUrl(course.youtubeLink)}
                                        title={course.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}

                            <h2 className="text-2xl font-semibold text-white mb-2">
                                {course.title}
                            </h2>
                            <p className="text-gray-300 text-sm mb-2">
                                <span className="text-yellow-400">Category:</span>{" "}
                                {course.category}
                            </p>
                            <p className="text-gray-300 text-sm mb-2">
                                <span className="text-yellow-400">Author:</span>{" "}
                                {course.author}
                            </p>
                            <p className="text-gray-400 mb-4">{course.description}</p>
                            <div className="flex justify-between text-sm text-gray-300 mb-4">
                                <span>
                                    <span className="text-yellow-400">Duration:</span>{" "}
                                    {course.duration} weeks
                                </span>
                                <span>
                                    <span className="text-yellow-400">Price:</span> $
                                    {course.price}
                                </span>
                            </div>
                            <button className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg w-full hover:bg-yellow-500 transition">
                                Enroll Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
