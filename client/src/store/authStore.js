import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null, // reload fix
    token: localStorage.getItem("token") || null, // reload fix
    user: null,
    token: null,
    loading: false,
    error: null,

    register: async (formData) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();


            // save user in state 
            if (res.ok) {
                set({ message: data.message || 'You are Register' }); // Set success message
            }
            set({ loading: false });
            return data;
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    login: async (formData) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            // Save token and user in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            set({ user: data.user, token: data.token, loading: false });

            return data;
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: null, token: null });
    }
}));

export default useAuthStore;
