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

            set((state) => ({
                assignments: [result, ...state.assignments],
            }));

            return {
                success: true,
                message: "Assignment created",
                assignment: result,
            };
        } catch (error) {
            console.error("Error creating assignment:", error);
            return { success: false, message: error.message };
        }
    },

    fetchAllAssignments: async () => {
        try {
            const response = await fetch("http://localhost:5000/api/assignment");
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to fetch assignments");

            set({ assignments: result });
            return { success: true, assignments: result };
        } catch (error) {
            console.error("Error fetching all assignments:", error);
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

    // ✅ Update assignment
    updateAssignment: async (id, updatedData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/assignment/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update assignment");

            set((state) => ({
                assignments: state.assignments.map((a) =>
                    a._id === id ? result : a
                ),
            }));

            return { success: true, assignment: result };
        } catch (error) {
            console.error("Error updating assignment:", error);
            return { success: false, message: error.message };
        }
    },

    // ✅ Delete assignment
    deleteAssignment: async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/assignment/delete/${id}`, {
                method: "DELETE",
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to delete assignment");

            set((state) => ({
                assignments: state.assignments.filter((a) => a._id !== id),
            }));

            return { success: true, message: result.message };
        } catch (error) {
            console.error("Error deleting assignment:", error);
            return { success: false, message: error.message };
        }
    },


    // ✅ Clear assignments
    clearAssignments: () => set({ assignments: [] }),
}));
