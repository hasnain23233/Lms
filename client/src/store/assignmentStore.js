import { create } from "zustand";

export const useAssignmentStore = create((set) => ({
    assignments: [],

    // ✅ Create new assignment
    createAssignment: async (assignmentData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/assignments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // protected route
                },
                body: JSON.stringify(assignmentData),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to create assignment");

            set((state) => ({
                assignments: [...state.assignments, result.assignment],
            }));

            return { success: true, message: result.message, assignment: result.assignment };
        } catch (error) {
            console.error("Error creating assignment:", error);
            return { success: false, message: error.message };
        }
    },

    // ✅ Fetch assignments by course
    fetchAssignmentsByCourse: async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/assignments/${courseId}`);
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to fetch assignments");

            set({ assignments: result });
        } catch (error) {
            console.error("Error fetching assignments:", error);
        }
    },

    // ✅ Clear assignments from store
    clearAssignments: () => set({ assignments: [] }),
}));
