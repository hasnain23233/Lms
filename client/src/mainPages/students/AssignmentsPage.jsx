import React, { useEffect, useState } from "react";
import { useStudentAssignmentStore } from "../../store/studentAssignmentStore";

const AssignmentsPage = () => {
    const { assignments, fetchMyAssignments, submitAssignment, loading, error } = useStudentAssignmentStore();
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submissionContent, setSubmissionContent] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) fetchMyAssignments(token);
    }, [token, fetchMyAssignments]);

    // ✅ Submit with validation
    const handleSubmit = async () => {
        if (!submissionContent.trim()) {
            alert("⚠️ Please write something before submitting.");
            return;
        }

        const res = await submitAssignment(token, selectedAssignment._id, submissionContent);

        if (res.success) {
            alert("✅ Assignment submitted successfully!");
            setSelectedAssignment(null);
            setSubmissionContent("");
            fetchMyAssignments(token); // refresh
        } else {
            alert("❌ " + res.message);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-yellow-500 border-dashed rounded-full animate-spin"></div>
            <span className="ml-3 text-yellow-400 text-lg animate-pulse">
                Loading assignments...
            </span>
        </div>
    );
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Your Assignments</h2>

            {selectedAssignment ? (
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">{selectedAssignment.title}</h3>
                    <textarea
                        value={submissionContent}
                        onChange={(e) => setSubmissionContent(e.target.value)}
                        placeholder="Write your submission here..."
                        className="w-full p-2 rounded bg-gray-700 text-white mb-3"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={!submissionContent.trim()} // ✅ disable empty submit
                        className={`px-4 py-2 rounded text-white ${!submissionContent.trim()
                            ? "bg-green-600 opacity-50 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        Submit Assignment
                    </button>
                    <button
                        onClick={() => setSelectedAssignment(null)}
                        className="ml-2 bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <ul className="space-y-4">
                    {assignments.length === 0 ? (
                        <p>No assignments available</p>
                    ) : (
                        assignments.map((assignment) => (
                            <li key={assignment._id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                                <h3 className="text-lg font-semibold">{assignment.title}</h3>
                                <p className="text-sm text-gray-300">Course: {assignment.courseId?.title}</p>

                                <button
                                    onClick={() => setSelectedAssignment(assignment)}
                                    disabled={assignment.submitted}
                                    className={`mt-2 px-3 py-1 rounded text-white ${assignment.submitted
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-yellow-500 hover:bg-yellow-600"
                                        }`}
                                >
                                    {assignment.submitted ? "Already Submitted" : "Submit Assignment"}
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default AssignmentsPage;
