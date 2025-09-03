import { create } from "zustand";

const API_URL = "http://localhost:5000/api/student/quizzes";

export const useStudentQuizStore = create((set) => ({
    quizzes: [],
    loading: false,
    error: null,

    // ✅ Fetch quizzes for logged-in student
    fetchMyQuizzes: async (token) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`${API_URL}/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch quizzes");
            }

            const data = await res.json();
            set({ quizzes: data.quizzes, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    // ✅ Attempt Quiz (Fixed URL)
    attemptQuiz: async (token, quizId, answers) => {
        try {
            const res = await fetch(`${API_URL}/attempt/${quizId}`, {   // 👈 FIXED
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ answers })
            });

            if (!res.ok) throw new Error("Failed to submit quiz");

            return await res.json(); // score + result
        } catch (err) {
            console.error("Quiz Attempt Error:", err);
            throw err;
        }
    }
}));
