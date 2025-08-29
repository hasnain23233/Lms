import React, { useState, useEffect } from "react";
import { useAssignmentStore } from "../store/assignmentStore";
import { useTecherStore } from "../store/techerStore"; // courses fetch karne ke liye
import useAuthStore from "../store/authStore";

const TeacherAssignments = () => {
    const { createAssignment } = useAssignmentStore();
    const { courses, fetchCourses } = useTecherStore();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [courseId, setCourseId] = useState(""); // dropdown ke liye
    const { user } = useAuthStore?.() || {};
    const teacherId = user?._id || user?.id || localStorage.getItem("userId");

    useEffect(() => {
        fetchCourses(); // teacher ke courses load karo
    }, [fetchCourses]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!courseId) {
            alert("⚠️ Please select a course first!");
            return;
        }

        console.log("Sending assignment:", { courseId, title, description, dueDate: deadline });

        const result = await createAssignment({
            title,
            description,
            dueDate: deadline,
            courseId,
            createdBy: teacherId
        });

        if (result.success) {
            alert("✅ Assignment Created Successfully!");
            setTitle("");
            setDescription("");
            setDeadline("");
            setCourseId("");
        } else {
            alert("❌ Failed: " + result.message);
        }
    };

    return (
        <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Assignment</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Course select dropdown */}
                <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                >
                    <option value="">-- Choose Course --</option>
                    {courses.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.title}   {/* yahi use karna hai */}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Assignment Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 rounded bg-gray-500"
                    required
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 rounded bg-gray-500"
                    required
                />

                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="p-2 rounded bg-gray-500"
                    required
                />

                <button
                    type="submit"
                    className="bg-yellow-500 text-black p-2 rounded-xl font-semibold"
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default TeacherAssignments;
