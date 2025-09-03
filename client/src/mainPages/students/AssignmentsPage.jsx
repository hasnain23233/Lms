import React, { useEffect, useState } from "react";
import { useStudentAssignmentStore } from "../../store/studentAssignmentStore";

const AssignmentsPage = () => {
    const {
        assignments,
        fetchMyAssignments,
        submitAssignment,
        loading,
        error,
    } = useStudentAssignmentStore();

    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submissionContent, setSubmissionContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const token = localStorage.getItem("token");

    // ✅ Fetch assignments on load
    useEffect(() => {
        if (token) fetchMyAssignments(token);
    }, [token, fetchMyAssignments]);

    // ✅ Submit assignment using store function
    const handleSubmit = async () => {
        if (!submissionContent.trim()) {
            alert("Please enter your submission content.");
            return;
        }

        try {
            setSubmitting(true);
            await submitAssignment(token, selectedAssignment._id, submissionContent);
            alert("Assignment submitted successfully!");
            setSelectedAssignment(null);
            setSubmissionContent("");
        } catch (err) {
            console.error("Submission error:", err);
            alert(err.message || "Error submitting assignment");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p className="text-yellow-400">Loading assignments...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Your Assignments</h2>

            {/* ✅ Assignment Submission Form */}
            {selectedAssignment ? (
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">{selectedAssignment.title}</h3>
                    <p className="mb-2 text-gray-300">{selectedAssignment.description}</p>
                    <p className="mb-2 text-gray-400">
                        Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                    </p>

                    <textarea
                        value={submissionContent}
                        onChange={(e) => setSubmissionContent(e.target.value)}
                        placeholder="Write your submission here..."
                        className="w-full p-2 rounded bg-gray-700 text-white mb-3"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className={`bg-green-600 px-4 py-2 rounded text-white ${submitting ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {submitting ? "Submitting..." : "Submit Assignment"}
                    </button>
                    <button
                        onClick={() => setSelectedAssignment(null)}
                        className="ml-2 bg-red-600 px-4 py-2 rounded text-white"
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
                            <li
                                key={assignment._id}
                                className="bg-gray-700 p-4 rounded-lg shadow-lg"
                            >
                                <h3 className="text-lg font-semibold">{assignment.title}</h3>
                                <p className="text-sm text-gray-300">
                                    Course: {assignment.courseId?.title}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                </p>

                                <button
                                    onClick={() => setSelectedAssignment(assignment)}
                                    disabled={assignment.submitted}
                                    className={`mt-2 px-3 py-1 rounded text-white ${assignment.submitted
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-yellow-500"
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
