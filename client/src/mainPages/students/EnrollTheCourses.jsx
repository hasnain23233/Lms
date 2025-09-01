import React, { useEffect } from "react";
import { useEnrollmentStore } from "../../store/studentEnrollmentStore";
import useAuthStore from "../../store/authStore"; // ✅ for user

// ✅ Helper to convert YouTube link → embed link
const getEmbedUrl = (url) => {
    if (!url) return "";
    return url.replace("watch?v=", "embed/");
};

const EnrollTheCourses = () => {
    const { enrollments, fetchEnrollments } = useEnrollmentStore();
    const { user } = useAuthStore(); // ✅ logged-in user check

    useEffect(() => {
        fetchEnrollments(); // ✅ fetch enrolled courses jab page load ho
    }, [fetchEnrollments]);

    return (
        <div className="bg-gray-800 min-h-screen py-10 px-6">
            <h2 className="text-yellow-400 text-3xl font-bold text-center mb-8">
                🎓 My Enrolled Courses
            </h2>

            {enrollments.length === 0 ? (
                <p className="text-gray-300 text-center">No courses enrolled yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {enrollments.map((course, index) => {
                        // ✅ Check correct video field (videoUrl ya youtubeLink)
                        const videoLink = course.videoUrl || course.youtubeLink;

                        return (
                            <div
                                key={index}
                                className="bg-gray-600 rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform"
                            >
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

                                {/* ✅ YouTube Video Embed */}
                                {videoLink && (
                                    <div className="mt-4">
                                        <iframe
                                            width="100%"
                                            height="200"
                                            src={
                                                user
                                                    ? getEmbedUrl(videoLink) // full video
                                                    : `${getEmbedUrl(videoLink)}?start=0&end=60` // preview
                                            }
                                            title={course.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="rounded-lg"
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default EnrollTheCourses;
