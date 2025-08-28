import React, { useState } from "react";
import { useQuizStore } from "../store/quizStore";
import { useTecherStore } from "../store/techerStore";

const TeacherCreateQuiz = () => {
    const { courses } = useTecherStore();
    const { createQuiz } = useQuizStore();

    const [title, setTitle] = useState("");
    const [courseId, setCourseId] = useState("");
    const [questions, setQuestions] = useState([
        { questionText: "", options: ["", ""], correctAnswer: "" },
    ]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Handle question change
    const handleQuestionChange = (index, field, value) => {
        const updated = [...questions];
        if (field === "questionText" || field === "correctAnswer") {
            updated[index][field] = value;
        } else {
            // field is option index
            updated[index].options[field] = value;
        }
        setQuestions(updated);
    };

    // Add new question
    const addQuestion = () => {
        setQuestions([...questions, { questionText: "", options: ["", ""], correctAnswer: "" }]);
    };

    // Add new option to a question
    const addOption = (index) => {
        const updated = [...questions];
        updated[index].options.push("");
        setQuestions(updated);
    };

    // Remove question
    const removeQuestion = (index) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !courseId) {
            setMessage("Please fill quiz title and select a course");
            return;
        }
        setLoading(true);
        const data = await createQuiz({ title, courseId, questions });
        setLoading(false);
        setMessage(data.success ? "Quiz created successfully!" : data.message);
        if (data.success) {
            setTitle("");
            setCourseId("");
            setQuestions([{ questionText: "", options: ["", ""], correctAnswer: "" }]);
        }
    };

    return (
        <div className="p-6 bg-gray-800 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6 text-yellow-400">Create New Quiz</h1>

            {message && (
                <div
                    className={`mb-4 p-3 rounded ${message.includes("success") ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Quiz Title */}
                <div>
                    <label className="block mb-1 font-semibold">Quiz Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                {/* Select Course */}
                <div>
                    <label className="block mb-1 font-semibold">Select Course</label>
                    <select
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    >
                        <option value="">-- Choose Course --</option>
                        {courses.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Questions */}
                <div>
                    <h2 className="text-xl font-bold mb-2 text-yellow-400">Questions</h2>
                    {questions.map((q, i) => (
                        <div key={i} className="mb-4 p-4 bg-gray-700 rounded">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold">Question {i + 1}</h3>
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(i)}
                                    className="text-red-400 hover:text-red-600 font-bold"
                                >
                                    Remove
                                </button>
                            </div>

                            <input
                                type="text"
                                placeholder="Question text"
                                value={q.questionText}
                                onChange={(e) => handleQuestionChange(i, "questionText", e.target.value)}
                                className="w-full mb-2 p-2 rounded bg-gray-600 text-white"
                                required
                            />

                            <div className="space-y-2">
                                {q.options.map((opt, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        placeholder={`Option ${idx + 1}`}
                                        value={opt}
                                        onChange={(e) => handleQuestionChange(i, idx, e.target.value)}
                                        className="w-full p-2 rounded bg-gray-600 text-white"
                                        required
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addOption(i)}
                                    className="text-yellow-400 hover:text-yellow-600 mt-1 font-semibold"
                                >
                                    + Add Option
                                </button>
                            </div>

                            <input
                                type="text"
                                placeholder="Correct Answer"
                                value={q.correctAnswer}
                                onChange={(e) => handleQuestionChange(i, "correctAnswer", e.target.value)}
                                className="w-full mt-2 p-2 rounded bg-gray-600 text-white"
                                required
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addQuestion}
                    className="px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded"
                >
                    + Add Question
                </button>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 bg-yellow-400 text-gray-800 font-bold rounded hover:bg-yellow-500"
                    >
                        {loading ? "Creating..." : "Create Quiz"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeacherCreateQuiz;
