import React from "react";

export default function About() {
    return (
        <div className="font-sans bg-gray-800 text-white">
            {/* Hero Section */}
            <section className="bg-gray-800 text-center py-20 px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
                    About Doroing LMS
                </h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Reimagining education with technology, accessibility, and innovation.
                </p>
            </section>

            {/* Who We Are */}
            <section className="bg-gray-600 py-16 px-8 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-6">Who We Are</h2>
                <p className="text-gray-200 max-w-3xl mx-auto">
                    Doroing LMS is a modern learning management system designed and developed
                    by <span className="text-yellow-400 font-semibold">Doroing</span> to simplify the way people learn and teach. Our mission
                    is to transform traditional education into a seamless digital experience
                    where learners can explore, grow, and achieve their goals without
                    boundaries.
                </p>
            </section>

            {/* Mission */}
            <section className="bg-gray-800 py-16 px-8 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-6">Our Mission</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                    At <span className="text-yellow-400 font-semibold">Doroing</span>, our mission is to create a smarter digital learning
                    ecosystem. With Doroing LMS, we aim to make knowledge accessible to
                    everyone — from students and professionals to organizations that want
                    to train and upskill their teams.
                </p>
            </section>

            {/* Vision */}
            <section className="bg-gray-600 py-16 px-8 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-6">Our Vision</h2>
                <p className="text-gray-200 max-w-3xl mx-auto">
                    We envision a world where technology bridges the gap between learning and
                    opportunity. <span className="text-yellow-400 font-semibold">Doroing LMS</span> is not just a platform — it’s a movement to
                    empower learners globally with engaging, flexible, and impactful
                    education.
                </p>
            </section>

            {/* What We Offer */}
            <section className="bg-gray-800 py-16 px-8 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-10">What We Offer</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-200">
                    <div className="bg-gray-600 p-6 rounded-lg shadow-lg">🎯 Ease of Use – A simple, intuitive platform for learners and instructors.</div>
                    <div className="bg-gray-600 p-6 rounded-lg shadow-lg">📖 Diverse Courses – Covering web development, data science, UI/UX, soft skills, and more.</div>
                    <div className="bg-gray-600 p-6 rounded-lg shadow-lg">📊 Analytics & Tracking – Helping learners and teachers measure success.</div>
                    <div className="bg-gray-600 p-6 rounded-lg shadow-lg">🌍 Global Accessibility – Learn anytime, anywhere, on any device.</div>
                    <div className="bg-gray-600 p-6 rounded-lg shadow-lg">🤝 Community Engagement – Collaboration, discussions, and peer support.</div>
                </div>
            </section>

            {/* Why Choose Doroing LMS */}
            <section className="bg-gray-600 py-16 px-8 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-6">Why Choose Doroing LMS?</h2>
                <p className="text-gray-200 max-w-3xl mx-auto">
                    Trusted by learners for clarity and engagement. Built with modern web
                    technologies for speed and responsiveness. Designed by <span className="text-yellow-400 font-semibold">Doroing</span> – a
                    company passionate about digital innovation.
                </p>
            </section>

            {/* Final Note */}
            <section className="bg-gray-800 py-16 px-8 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-4">Final Note</h2>
                <p className="text-gray-300 max-w-3xl mx-auto mb-6">
                    Learning is a journey, and at <span className="text-yellow-400 font-semibold">Doroing LMS</span>, we walk that path with
                    you — making every step engaging, insightful, and rewarding.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
                        Join Us Today
                    </button>
                    <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition">
                        Explore Courses
                    </button>
                </div>
            </section>
        </div>
    );
}
