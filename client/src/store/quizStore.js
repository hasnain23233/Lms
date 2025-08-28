import { create } from "zustand";

export const useQuizStore = create((set) => ({
    quizzes: [],

    // ✅ Create new quiz
    createQuiz: async (quizData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/quizzes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // protected route
                },
                body: JSON.stringify(quizData),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to create quiz");

            set((state) => ({
                quizzes: [...state.quizzes, result.quiz],
            }));

            return { success: true, message: result.message, quiz: result.quiz };
        } catch (error) {
            console.error("Error creating quiz:", error);
            return { success: false, message: error.message };
        }
    },

    // ✅ Fetch quizzes by course
    fetchQuizzesByCourse: async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/quizzes/${courseId}`);
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to fetch quizzes");

            set({ quizzes: result });
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    },

    // ✅ Clear quizzes from store
    clearQuizzes: () => set({ quizzes: [] }),
}));
