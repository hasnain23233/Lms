import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
                    Login to LMS
                </h2>

                <form className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                            Email / Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your email or username"
                            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                            Select Role
                        </label>
                        <select className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>

                    {/* Remember Me + Forgot Password */}
                    <div className="flex items-center justify-between text-gray-400">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4 accent-yellow-400" />
                            <span>Remember Me</span>
                        </label>
                        <a href="#" className="text-yellow-400 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-gray-400 text-center mt-6">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-yellow-400 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
