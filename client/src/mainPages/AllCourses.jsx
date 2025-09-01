import React, { useEffect, useState } from "react";
import { useTecherStore } from "../store/techerStore";
import useAuthStore from "../store/authStore";
import { useEnrollmentStore } from "../store/assignmentStore"; // ✅ new import

const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";

    if (url.includes("watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }

    return `https://www.youtube.com/embed/${videoId}`;
};

export default function AllCourses() {
    const { courses, fetchCourses } = useTecherStore();
    const { user } = useAuthStore(); // ✅ current login user
    const { enrollCourse } = useEnrollmentStore(); // ✅ zustand function
    const [showOverlay, setShowOverlay] = useState({});

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // ✅ Timer for guest user → after 1 min show overlay
    useEffect(() => {
        if (!user) {
            const timers = {};
            courses.forEach((course, index) => {
                timers[index] = setTimeout(() => {
                    setShowOverlay((prev) => ({ ...prev, [index]: true }));
                }, 60000);
            });
            return () => Object.values(timers).forEach(clearTimeout);
        }
    }, [courses, user]);

    // ✅ handle enroll button click
    const handleEnroll = async (courseId) => {
        if (!user) {
            alert("Please login to enroll in a course!");
            return;
        }

        try {
            await enrollCourse(user._id, courseId);
            alert("✅ Enrolled Successfully!");
        } catch (err) {
            alert(err.message || "❌ Error while enrolling");
        }
    };

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
                            className="bg-gray-600 rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform relative"
                        >
                            {course.youtubeLink && (
                                <div className="mb-4 relative">
                                    <iframe
                                        className="w-full h-52 rounded-lg"
                                        src={
                                            user
                                                ? getEmbedUrl(course.youtubeLink)
                                                : `${getEmbedUrl(course.youtubeLink)}?start=0&end=60`
                                        }
                                        title={course.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>

                                    {!user && showOverlay[index] && (
                                        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center rounded-lg">
                                            <p className="text-white text-lg font-semibold mb-4">
                                                Please login to watch full video
                                            </p>
                                            <button
                                                onClick={() => (window.location.href = "/login")}
                                                className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
                                            >
                                                Login Now
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            <h2 className="text-2xl font-semibold text-white mb-2">
                                {course.title}
                            </h2>
                            <p className="text-gray-300 text-sm mb-2">
                                <span className="text-yellow-400">Category:</span> {course.category}
                            </p>
                            <p className="text-gray-300 text-sm mb-2">
                                <span className="text-yellow-400">Author:</span> {course.author}
                            </p>
                            <p className="text-gray-400 mb-4">{course.description}</p>
                            <div className="flex justify-between text-sm text-gray-300 mb-4">
                                <span>
                                    <span className="text-yellow-400">Duration:</span> {course.duration} weeks
                                </span>
                                <span>
                                    <span className="text-yellow-400">Price:</span> ${course.price}
                                </span>
                            </div>
                            <button
                                onClick={() => handleEnroll(course._id)}
                                className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg w-full hover:bg-yellow-500 transition"
                            >
                                Enroll Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
