import { create } from "zustand";
import useAuthStore from "./authStore";

export const useQuizStore = create((set) => ({
    quizzes: [],

    createQuiz: async (quizData) => {
        try {
            const token = useAuthStore.getState().token;
            if (!token) throw new Error("User not logged in");

            const response = await fetch("http://localhost:5000/api/quizzes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // must be Bearer <token>
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

    clearQuizzes: () => set({ quizzes: [] }),
}));
