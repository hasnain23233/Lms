// src/store/enrollmentStore.js
import { create } from "zustand";

export const useEnrollmentStore = create((set) => ({
    enrollments: [],

    // ✅ Enroll in a course
    enrollCourse: async (courseId) => {
        console.log("Sending to backend:", { courseId });

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/enrollment/enroll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify({ courseId }), // studentId backend me JWT se niklega
            });

            const result = await response.json();
            console.log("Enrollment API result:", result);

            if (!response.ok) throw new Error(result.message || "Enrollment failed");

            set((state) => ({
                enrollments: [...state.enrollments, result.enrollment], // ✅ only enrollment object push
            }));

            return { success: true, enrollment: result.enrollment };
        } catch (error) {
            console.error("Error enrolling:", error);
            return { success: false, message: error.message };
        }
    },

    // ✅ Fetch all enrollments
    fetchEnrollments: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/enrollment/my-courses", {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });

            const result = await response.json();
            console.log("Fetch Enrollments API result:", result);

            if (!response.ok) throw new Error(result.message || "Failed to fetch enrollments");

            set({ enrollments: result.courses }); // ✅ backend se courses array aata hai
            return { success: true, enrollments: result.courses };
        } catch (error) {
            console.error("Error fetching enrollments:", error);
            return { success: false, message: error.message };
        }
    }
}));
