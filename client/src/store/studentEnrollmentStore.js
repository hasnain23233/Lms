// store/studentEnrollmentStore.js
import { create } from "zustand";

export const useEnrollmentStore = create((set) => ({
    myCourses: [],

    // ✅ Enroll in a course
    enrollCourse: async (studentId, courseId) => {
        try {
            const response = await fetch("http://localhost:5000/api/enrollment/enroll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId, courseId }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to enroll");

            // Add new course to store (just courseId reference)
            set((state) => ({
                myCourses: [...state.myCourses, result.enrollment.courseId],
            }));

            return { success: true, message: result.message };
        } catch (error) {
            console.error("Error enrolling:", error);
            return { success: false, message: error.message };
        }
    },

    // ✅ Fetch all enrolled courses
    fetchMyCourses: async (studentId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/enrollment/my-courses/${studentId}`
            );
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to fetch my courses");

            set({ myCourses: result.courses });
        } catch (error) {
            console.error("Error fetching my courses:", error);
        }
    },

    // ✅ Clear
    clearEnrollments: () => set({ myCourses: [] }),
}));
