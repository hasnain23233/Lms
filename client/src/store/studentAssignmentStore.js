import { create } from "zustand";

const API_URL = "http://localhost:5000/api/student/assignments";

export const useStudentAssignmentStore = create((set) => ({
    assignments: [],
    loading: false,
    error: null,

    // ✅ Fetch assignments for logged-in student
    fetchMyAssignments: async (token) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`${API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
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

    // ✅ Submit assignment (text/link)
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

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to submit assignment");
            }

            const data = await res.json();

            // Update assignment as submitted in store
            set((state) => ({
                assignments: state.assignments.map((a) =>
                    a._id === assignmentId ? { ...a, submitted: true } : a
                ),
            }));

            return data;
        } catch (err) {
            console.error("Submit Assignment Error:", err);
            throw err;
        }
    },
}));
