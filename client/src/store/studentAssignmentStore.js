import { create } from "zustand";

const API_URL = "http://localhost:5000/api/student/assignments";

export const useStudentAssignmentStore = create((set, get) => ({
    assignments: [],
    loading: false,
    error: null,

    // ✅ Fetch logged-in student's assignments
    fetchMyAssignments: async (token) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`${API_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to fetch assignments");
            }

            const data = await res.json();
            set({ assignments: data.assignments, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    // ✅ Submit an assignment
    submitAssignment: async (token, assignmentId, content) => {
        try {
            const res = await fetch(`${API_URL}/submit/${assignmentId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to submit assignment");

            // Refresh assignments after submission
            await get().fetchMyAssignments(token);

            return { success: true, message: data.message };
        } catch (err) {
            return { success: false, message: err.message };
        }
    },
}));
