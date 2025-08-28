import React, { useEffect } from "react";
import { useQuizStore } from "../store/quizStore";
import useAuthStore from "../store/authStore";

const ManageQuiz = ({ courseId }) => {
    const { quizzes, fetchQuizzesByCourse, deleteQuiz } = useQuizStore();
    const { user } = useAuthStore();

    useEffect(() => {
        fetchQuizzesByCourse(courseId);
    }, [courseId]);

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Quizzes</h2>

            {quizzes.map((quiz) => (
                <div key={quiz._id} className="bg-gray-700 p-4 mb-3 rounded-lg shadow-md flex justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">{quiz.title}</h3>
                        <p>{quiz.questions.length} Questions</p>
                    </div>

                    {user?.role === "teacher" && (
                        <div className="space-x-2">
                            <button
                                onClick={() => console.log("Edit quiz", quiz._id)}
                                className="bg-yellow-500 px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteQuiz(quiz._id)}
                                className="bg-red-600 px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ManageQuiz
