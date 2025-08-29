import React, { useState } from "react";
import { useAssignmentStore } from "../store/assignmentStore";

const TeacherAssignments = ({ courseId }) => {
    const { addAssignment } = useAssignmentStore();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addAssignment({ title, description, deadline, courseId });
        setTitle("");
        setDescription("");
        setDeadline("");
    };

    return (
        <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Assignment</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Assignment Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 rounded bg-gray-500"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 rounded bg-gray-500"
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="p-2 rounded bg-gray-500"
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
