import { create } from 'zustand'

export const useTecherStore = create((set) => ({
    courses: [],

    addCourse: async (courseData) => {
        try {
            const response = await fetch('http://localhost:5000/api/teacher/add-course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });

            if (!response.ok) {
                throw new Error('Failed to add course');
            }

            const result = await response.json();

            set((state) => ({
                courses: [...state.courses, result.course]
            }));

            return { success: true, message: result.message, course: result.course };

        } catch (error) {
            console.error('Error adding course:', error);
            return { success: false, message: error.message };
        }
    },

    fetchCourses: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/teacher/all-courses');
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const result = await response.json();
            set({ courses: result.courses });
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    },

    clearCourses: () => set({ courses: [] }),
}));
