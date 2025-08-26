import { create } from "zustand";
const useAuthStore = create((set) => ({
    user: null,
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

            set({ user: data.user, loading: false });
            return data;
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },
}));

export default useAuthStore;
