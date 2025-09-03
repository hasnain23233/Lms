import React, { useEffect, useState } from "react";
import { useStudentQuizStore } from "../../store/studentQuizStore";

const QuizzesPage = () => {
    const { quizzes, fetchMyQuizzes, attemptQuiz, loading, error } = useStudentQuizStore();
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const token = localStorage.getItem("token");

    // ✅ Fetch quizzes on load
    useEffect(() => {
        if (token) fetchMyQuizzes(token);
    }, [token, fetchMyQuizzes]);

    // ✅ Select option
    const handleOptionChange = (qId, option) => {
        setAnswers(prev => ({ ...prev, [qId]: option }));
    };

    // ✅ Submit quiz attempt
    const handleSubmit = async () => {
        if (!selectedQuiz) return;

        const formattedAnswers = selectedQuiz.questions.map(q => ({
            questionId: q._id,
            selectedOption: answers[q._id] || ""
        }));

        try {
            const res = await attemptQuiz(token, selectedQuiz._id, formattedAnswers);
            setResult(res);

            // Mark quiz as attempted in frontend state
            selectedQuiz.attempted = true;

            setSelectedQuiz(null);
            setAnswers({});
        } catch (err) {
            alert(err.message || "Error submitting quiz");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-yellow-500 border-dashed rounded-full animate-spin"></div>
                <span className="ml-3 text-yellow-400 text-lg animate-pulse">
                    Loading quizzes...
                </span>
            </div>
        );
    }

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Take Quizzes</h2>

            {/* ✅ Quiz Questions */}
            {selectedQuiz ? (
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">{selectedQuiz.title}</h3>

                    {selectedQuiz.questions.map(q => (
                        <div key={q._id} className="mb-4">
                            <p className="text-white font-semibold">{q.questionText}</p>

                            {Array.isArray(q.options) && q.options.length > 0 ? (
                                q.options.map((opt, idx) => (
                                    <label key={idx} className="block text-white">
                                        <input
                                            type="radio"
                                            name={`question-${q._id}`}
                                            value={opt}
                                            checked={answers[q._id] === opt}
                                            onChange={() => handleOptionChange(q._id, opt)}
                                        />
                                        {opt}
                                    </label>
                                ))
                            ) : (
                                <p className="text-red-400">⚠️ No options found for this question</p>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 px-4 py-2 rounded text-white"
                    >
                        Submit Quiz
                    </button>
                </div>
            ) : (
                <div>
                    {/* ✅ Result */}
                    {result && (
                        <div className="mb-4 p-3 bg-blue-700 rounded">
                            🎉 Your Score: {result.score} / {result.total}
                        </div>
                    )}

                    {/* ✅ Show all quizzes */}
                    {quizzes.length === 0 ? (
                        <p>No quizzes available</p>
                    ) : (
                        <ul className="space-y-4">
                            {quizzes.map(quiz => (
                                <li key={quiz._id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                                    <h3 className="text-lg font-semibold">{quiz.title}</h3>
                                    <p className="text-sm text-gray-300">
                                        Course: {quiz.courseId?.title}
                                    </p>
                                    <button
                                        onClick={() => setSelectedQuiz(quiz)}
                                        disabled={quiz.attempted} // ✅ Disable if already attempted
                                        className={`mt-2 px-3 py-1 rounded text-white ${quiz.attempted
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-yellow-500"
                                            }`}
                                    >
                                        {quiz.attempted ? "Already Attempted" : "Attempt Quiz"}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizzesPage;
