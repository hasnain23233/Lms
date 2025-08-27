import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null, // reload fix
    token: localStorage.getItem("token") || null,           // reload fix
    loading: false,
    error: null,
    message: null, // ✅ success msg store karne ke liye

    // ---------------- Register ----------------
    register: async (formData) => {
        set({ loading: true, error: null, message: null });
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            // ✅ success message set
            set({ message: data.message || "You are registered successfully", loading: false });
            return data;
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    // ---------------- Login ----------------
    login: async (formData) => {
        set({ loading: true, error: null, message: null });
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            // ✅ Save token and user in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            set({ user: data.user, token: data.token, loading: false });
            return data;
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    // ---------------- Logout ----------------
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: null, token: null });
    }
}));

export default useAuthStore;
