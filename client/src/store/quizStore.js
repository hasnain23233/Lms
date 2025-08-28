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
    fetchAllQuizzes: async () => {
        try {
            const response = await fetch("http://localhost:5000/api/quizzes");
            const result = await response.json();

            if (!response.ok) throw new Error(result.message || "Failed to fetch quizzes");

            set({ quizzes: result });
        } catch (error) {
            console.error("Error fetching all quizzes:", error);
        }
    },


    fetchQuizzesByCourse: async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/quizzes/${courseId}`);
            const result = await response.json();
            console.log("Fetched quizzes result:", result); // 👈 Debug karo

            if (!response.ok) throw new Error(result.message || "Failed to fetch quizzes");

            // agar backend { quizzes: [...] } return karta hai
            set({ quizzes: result.quizzes || result });
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    },

    deleteQuiz: async (quizId) => {
        try {
            const token = useAuthStore.getState().token;
            const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            set((state) => ({
                quizzes: state.quizzes.filter((q) => q._id !== quizId),
            }));

            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    // ✅ Update quiz
    updateQuiz: async (quizId, updatedQuiz) => {
        try {
            const token = useAuthStore.getState().token;
            const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedQuiz),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            set((state) => ({
                quizzes: state.quizzes.map((q) => (q._id === quizId ? data.quiz : q)),
            }));

            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    clearQuizzes: () => set({ quizzes: [] }),
}));
