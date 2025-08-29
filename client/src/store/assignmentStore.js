import { create } from "zustand";

export const useAssignmentStore = create((set) => ({
    assignments: [],

    // ✅ Create new assignment
    createAssignment: async (assignmentData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/assignment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify(assignmentData),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to create assignment");

            const newAssignment = result.assignment || result;

            set((state) => ({
                assignments: [...state.assignments, newAssignment],
            }));

            return {
                success: true,
                message: result.message || "Assignment created",
                assignment: newAssignment,
            };
        } catch (error) {
            console.error("Error creating assignment:", error);
            return { success: false, message: error.message };
        }
    },

    // ✅ Fetch assignments by course
    fetchAssignmentsByCourse: async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/assignment/course/${courseId}`);
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to fetch assignments");

            set({ assignments: result });
            return { success: true, assignments: result };
        } catch (error) {
            console.error("Error fetching assignments:", error);
            return { success: false, message: error.message };
        }
    },

    // ✅ Clear assignments from store
    clearAssignments: () => set({ assignments: [] }),
}));
