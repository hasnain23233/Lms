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
        if (token) {
            fetchMyQuizzes(token);
        }
    }, [token, fetchMyQuizzes]);

    // ✅ Select option
    const handleOptionChange = (qIndex, option) => {
        setAnswers((prev) => ({ ...prev, [qIndex]: option }));
    };

    // ✅ Submit quiz attempt
    const handleSubmit = async () => {
        try {
            const formattedAnswers = selectedQuiz.questions.map((q, i) => ({
                questionId: q._id,
                selectedOption: answers[i],
            }));

            const res = await attemptQuiz(token, selectedQuiz._id, formattedAnswers);
            setResult(res);
            setSelectedQuiz(null);
            setAnswers({});
        } catch (err) {
            alert("Error submitting quiz");
        }
    };

    if (loading) return <p className="text-white">Loading quizzes...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Take Quizzes</h2>

            {/* ✅ If quiz selected show quiz questions */}
            {selectedQuiz ? (
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">{selectedQuiz.title}</h3>

                    {selectedQuiz.questions.map((q, qIndex) => (
                        <div key={qIndex} className="mb-4">
                            <p className="text-white font-semibold">{q.questionText}</p>

                            {/* 🔍 Debugging log */}
                            {console.log("Question data =>", q)}

                            {/* ✅ Agar q.options exist nahi karta to Object.values try karenge */}
                            {Array.isArray(q.options) && q.options.length > 0 ? (
                                q.options.map((opt, optIndex) => (
                                    <label key={optIndex} className="block text-white">
                                        <input
                                            type="radio"
                                            name={`question-${qIndex}`}
                                            value={opt}
                                            checked={answers[qIndex] === opt}
                                            onChange={() => handleOptionChange(qIndex, opt)}
                                        />
                                        {opt}
                                    </label>
                                ))
                            ) : q.options && typeof q.options === "object" ? (
                                Object.values(q.options).map((opt, optIndex) => (
                                    <label key={optIndex} className="block text-white">
                                        <input
                                            type="radio"
                                            name={`question-${qIndex}`}
                                            value={opt}
                                            checked={answers[qIndex] === opt}
                                            onChange={() => handleOptionChange(qIndex, opt)}
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
                    {/* ✅ Show result after attempt */}
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
                            {quizzes.map((quiz) => (
                                <li key={quiz._id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                                    <h3 className="text-lg font-semibold">{quiz.title}</h3>
                                    <p className="text-sm text-gray-300">
                                        Course: {quiz.courseId?.title}
                                    </p>
                                    <button
                                        onClick={() => setSelectedQuiz(quiz)}
                                        className="bg-blue-500 mt-2 px-3 py-1 rounded text-white"
                                    >
                                        Attempt Quiz
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
