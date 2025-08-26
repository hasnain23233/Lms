import React, { useState } from "react";
import useAuthStore from '../store/authStore';

export default function Signup() {
    const { register, loading, error, user } = useAuthStore();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
        phone: "",
        country: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        await register(formData);
    };

    return (
        <div className="font-sans bg-gray-800 text-white min-h-screen flex items-center justify-center px-6">
            <div className="bg-gray-700 w-full max-w-5xl p-10 rounded-2xl shadow-2xl">
                <h1 className="text-2xl font-bold text-yellow-400 text-center mb-10 tracking-wide">
                    Sign Up to Doroing LMS
                </h1>
                {error && <p className="text-red-500 mt-3">{error}</p>}
                {user && <p className="text-green-600 mt-3">✅ {user.firstName} registered successfully!</p>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl text-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 text-sm py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-sm rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl text-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl text-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Phone Number (Optional)</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl text-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Country (Optional)</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-sm rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter your country"
                        />
                    </div>

                    {/* Terms & Conditions */}
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                        <input type="checkbox" required />
                        <span className="text-gray-300 text-sm">
                            I agree to the <span className="text-yellow-400 text-sm">Terms & Conditions</span>
                        </span>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2">
                        <button
                            type="submit"
                            className="w-2/12 text-sm bg-yellow-400 text-gray-800 py-3 rounded-xl font-bold hover:bg-yellow-300 transition duration-300 shadow-md"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}