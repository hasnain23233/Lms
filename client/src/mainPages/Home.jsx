import React from "react";

export default function Home() {
    return (
        <div className="font-sans bg-gray-800 text-white">
            {/* Hero Section */}
            <section className="bg-gray-800 text-center py-20 px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
                    Empowering Learning with Doroing LMS
                </h1>
                <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                    At Doroing, we believe in making education smarter, simpler, and more
                    accessible. Our Learning Management System is built to help learners
                    achieve more and instructors teach better.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
                        Get Started
                    </button>
                    <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition">
                        Explore Courses
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-600 py-16 px-8 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-10">
                    Why Choose Doroing LMS?
                </h2>
                <div className="grid md:grid-cols-3 gap-8 text-gray-200">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-yellow-400/20 transition">
                        <h3 className="text-xl font-semibold mb-2">🎯 User-Friendly Dashboard</h3>
                        <p>Simplified design for smooth navigation.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-yellow-400/20 transition">
                        <h3 className="text-xl font-semibold mb-2">📖 Interactive Courses</h3>
                        <p>Engaging and structured content built for learners.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-yellow-400/20 transition">
                        <h3 className="text-xl font-semibold mb-2">📊 Progress Tracking</h3>
                        <p>Monitor your growth and achievements in real time.</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-gray-800 py-16 px-8 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-6">About Doroing LMS</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                    Doroing LMS is a smart platform developed by Doroing to bring
                    innovation into digital learning. We aim to deliver an intuitive,
                    powerful, and scalable solution that transforms the way individuals
                    and organizations learn.
                </p>
            </section>

            {/* Popular Courses Section */}
            <section className="bg-gray-600 py-16 px-8 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-10">
                    Explore Courses on Doroing LMS
                </h2>
                <div className="grid md:grid-cols-5 gap-6 text-gray-200">
                    <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition">🔥 Web Development</div>
                    <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition">📱 Mobile App Dev</div>
                    <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition">🧠 Data Science & AI</div>
                    <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition">🎨 UI/UX Design</div>
                    <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition">🏆 Career Growth</div>
                </div>
                <button className="mt-8 bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
                    View All Courses
                </button>
            </section>

            {/* Testimonials */}
            <section className="bg-gray-800 py-16 px-8 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-10">
                    What Learners Say About Doroing LMS
                </h2>
                <div className="grid md:grid-cols-2 gap-8 text-gray-200">
                    <div className="bg-gray-600 p-6 rounded-lg shadow-lg">
                        ⭐ "Doroing LMS made my learning journey so simple and fun!" – Ayesha K.
                    </div>
                    <div className="bg-gray-600 p-6 rounded-lg shadow-lg">
                        ⭐ "Great design and easy-to-use interface. Highly recommended!" – Ali R.
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gray-600 text-center py-16 px-8">
                <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                    Upgrade your learning with Doroing LMS today
                </h2>
                <div className="flex justify-center gap-4">
                    <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
                        Sign Up Now
                    </button>
                    <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition">
                        Login
                    </button>
                </div>
            </section>
        </div>
    );
}