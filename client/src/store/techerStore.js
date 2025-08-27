import { create } from "zustand";

export const useTecherStore = create((set) => ({
    courses: [],

    // ✅ Add new course
    addCourse: async (courseData) => {
        try {
            const response = await fetch("http://localhost:5000/api/teacher/add-course", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(courseData),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to add course");

            set((state) => ({
                courses: [...state.courses, result.course],
            }));

            return { success: true, message: result.message, course: result.course };
        } catch (error) {
            console.error("Error adding course:", error);
            return { success: false, message: error.message };
        }
    },

    // ✅ Fetch all courses
    fetchCourses: async () => {
        try {
            const response = await fetch("http://localhost:5000/api/teacher/all-courses");
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to fetch courses");

            set({ courses: result.courses });
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    },

    // ✅ Update course
    updateCourse: async (id, updatedData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/teacher/update-course/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update course");

            set((state) => ({
                courses: state.courses.map((course) =>
                    course._id === id ? result.course : course
                ),
            }));

            return { success: true, message: result.message, course: result.course };
        } catch (error) {
            console.error("Error updating course:", error);
            return { success: false, message: error.message };
        }
    },

    // ✅ Delete course
    deleteCourse: async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/teacher/delete-course/${id}`, {
                method: "DELETE",
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to delete course");

            set((state) => ({
                courses: state.courses.filter((course) => course._id !== id),
            }));

            return { success: true, message: result.message };
        } catch (error) {
            console.error("Error deleting course:", error);
            return { success: false, message: error.message };
        }
    },

    // ✅ Clear store
    clearCourses: () => set({ courses: [] }),
}));
