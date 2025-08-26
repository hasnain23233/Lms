import React from "react";

const courses = [
    {
        id: 1,
        title: "Frontend Development with React",
        category: "Web Development",
        teacher: "Hasnain Khushi",
        description: "Learn React.js from basics to advanced with hands-on projects.",
        duration: "8 weeks",
        level: "Beginner",
    },
    {
        id: 2,
        title: "Data Analysis with Python",
        category: "Data Science",
        teacher: "Rohail",
        description:
            "Master data cleaning, visualization, and analysis with Python libraries.",
        duration: "10 weeks",
        level: "Intermediate",
    },
    {
        id: 3,
        title: "UI/UX Design Fundamentals",
        category: "Design",
        teacher: "Asifa",
        description:
            "Understand design principles, wireframing, and prototyping for modern apps.",
        duration: "6 weeks",
        level: "Beginner",
    },
    {
        id: 4,
        title: "Database Management with SQL",
        category: "Database",
        teacher: "Wasim",
        description:
            "Learn SQL queries, normalization, and database design with real projects.",
        duration: "9 weeks",
        level: "Advanced",
    },
];

export default function AllCourses() {
    return (
        <div className="bg-gray-800 min-h-screen py-10 px-6">
            <h1 className="text-4xl font-bold text-yellow-400 text-center mb-10">
                All Courses – Doroing LMS
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-gray-600 rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform"
                    >
                        <h2 className="text-2xl font-semibold text-white mb-2">
                            {course.title}
                        </h2>
                        <p className="text-gray-300 text-sm mb-2">
                            <span className="text-yellow-400">Category:</span> {course.category}
                        </p>
                        <p className="text-gray-300 text-sm mb-2">
                            <span className="text-yellow-400">Teacher:</span> {course.teacher}
                        </p>
                        <p className="text-gray-400 mb-4">{course.description}</p>
                        <div className="flex justify-between text-sm text-gray-300 mb-4">
                            <span>
                                <span className="text-yellow-400">Duration:</span>{" "}
                                {course.duration}
                            </span>
                            <span>
                                <span className="text-yellow-400">Level:</span> {course.level}
                            </span>
                        </div>
                        <button className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg w-full hover:bg-yellow-500 transition">
                            Enroll Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
