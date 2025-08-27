import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="py-6 px-4 h-full flex flex-col justify-between bg-gray-800 text-white">
            {/* Logo + Main Links */}
            <div>
                <h1 className="text-2xl font-semibold">
                    LMS <br />
                    <span className="text-yellow-500 tracking-wider text-xl">
                        (learning management system)
                    </span>
                </h1>
                <ul>
                    <li>
                        <Link
                            to="/all-courses"
                            className="block py-2 px-4 rounded text-gray-200 hover:bg-gray-600 mt-6"
                        >
                            All Course
                        </Link>
                        {!user ? (
                            <>
                                <Link
                                    to="/"
                                    className="block py-2 px-4 rounded text-gray-200 hover:bg-gray-600"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/about"
                                    className="block py-2 px-4 rounded text-gray-200 hover:bg-gray-600"
                                >
                                    About
                                </Link>
                            </>
                        ) : null}
                        {user && user.role === 'student' && (
                            <>

                                <Link
                                    to="/student-courses"
                                    className="block py-2 px-4 rounded text-gray-200 hover:bg-gray-600"
                                >
                                    Your Courses
                                </Link>
                                <Link
                                    to="/take-quiz"
                                    className="block py-2 px-4 rounded text-gray-200 hover:bg-gray-600"
                                >
                                    take quiz
                                </Link>
                            </>
                        )}
                        {user && user.role === 'teacher' && (
                            <>

                                <Link
                                    to="/add-course"
                                    className="block py-2 px-4 rounded text-gray-200 hover:bg-gray-600"
                                >
                                    Add Course
                                </Link>
                                <Link
                                    to="/create-quiz"
                                    className="block py-2 px-4 rounded text-gray-200 hover:bg-gray-600"
                                >
                                    create quiz
                                </Link>
                            </>
                        )}
                    </li>
                </ul>
            </div>

            {/* Auth Section */}
            <ul className="bg-gray-600 mt-6 p-4 rounded">
                {user ? (
                    <li className="flex flex-col gap-2">
                        <span className="block py-2 px-4 rounded bg-gray-700 text-gray-200">
                            {user.email} ({user.role})
                        </span>
                        <button
                            onClick={handleLogout}
                            className="block py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link
                            to="/login"
                            className="block py-2 px-4 rounded text-gray-200 hover:bg-gray-500"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="block py-2 px-4 rounded text-gray-200 hover:bg-gray-500"
                        >
                            Signup
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Navbar;
