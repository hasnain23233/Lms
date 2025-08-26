import { create } from "zustand";

const useAuthStore = create((set) => ({
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

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            // save user in state
            set({ user: data.user, loading: false });
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

            // Save token and user
            localStorage.setItem("token", data.token);  // important
            set({ user: data.user, token: data.token, loading: false });

            return data;
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    }
}));

export default useAuthStore;
