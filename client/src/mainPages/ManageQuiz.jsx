import React, { useEffect, useState } from "react";
import { useQuizStore } from "../store/quizStore";
import useAuthStore from "../store/authStore";

const QuizPage = ({ courseId }) => {
    const { quizzes, fetchQuizzesByCourse, fetchAllQuizzes, deleteQuiz, updateQuiz } = useQuizStore();
    const { user } = useAuthStore();

    const [editingQuiz, setEditingQuiz] = useState(null);
    const [formData, setFormData] = useState({ title: "", questions: [] });

    useEffect(() => {
        if (courseId) {
            fetchQuizzesByCourse(courseId);
        } else {
            fetchAllQuizzes();
        }
    }, [courseId]);

    // 🟡 Open edit modal
    const handleEdit = (quiz) => {
        setEditingQuiz(quiz);
        setFormData({
            title: quiz.title,
            questions: quiz.questions.map((q) => q.questionText || ""),
        });
    };

    // 🟡 Save updated quiz
    const handleSave = async () => {
        const updated = {
            title: formData.title,
            questions: formData.questions.map((q) => ({
                questionText: q,
                options: ["Option A", "Option B"], // placeholder until we build full options UI
                correctAnswer: "Option A",
            })),
        };
        await updateQuiz(editingQuiz._id, updated);
        setEditingQuiz(null);
    };

    // 🟡 Update question text
    const handleQuestionChange = (i, value) => {
        const newQs = [...formData.questions];
        newQs[i] = value;
        setFormData({ ...formData, questions: newQs });
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Quizzes</h2>

            {quizzes && quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <div
                        key={quiz._id}
                        className="bg-gray-700 p-4 mb-3 rounded-lg shadow-md flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-yellow-400">{quiz.title}</h3>
                            <p>{quiz.questions.length} Questions</p>
                        </div>

                        {user?.role === "teacher" && (
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEdit(quiz)}
                                    className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this quiz?")) {
                                            deleteQuiz(quiz._id);
                                        }
                                    }}
                                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-gray-400 text-center mt-6">No quizzes found</p>
            )}

            {/* 🟡 Edit Modal */}
            {editingQuiz && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Quiz</h2>

                        {/* Quiz Title */}
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                            placeholder="Quiz Title"
                        />

                        {/* Questions */}
                        {formData.questions.map((q, i) => (
                            <input
                                key={i}
                                type="text"
                                value={q}
                                onChange={(e) => handleQuestionChange(i, e.target.value)}
                                className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
                                placeholder={`Question ${i + 1}`}
                            />
                        ))}

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleSave}
                                className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditingQuiz(null)}
                                className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
