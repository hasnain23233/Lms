import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api"; // ✅ apna backend base URL

// ✅ Simple Dark Card component
function Card({ children, className }) {
    return (
        <div
            className={`shadow-lg rounded-2xl p-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white ${className || ""}`}
        >
            {children}
        </div>
    );
}

function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
}

export default function StudentDashboard() {
    const [courses, setCourses] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ API se data fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token"); // auth token
                const headers = { Authorization: `Bearer ${token}` };

                const [cRes, aRes, qRes] = await Promise.all([
                    fetch(`${API_URL}/enrollment/my-courses`, { headers }),
                    fetch(`${API_URL}/student/assignments/me`, { headers }),
                    fetch(`${API_URL}/student/quizzes/me`, { headers }),
                ]);

                const cData = await cRes.json();
                const aData = await aRes.json();
                const qData = await qRes.json();

                setCourses(cData.courses || []);
                setAssignments(aData.assignments || []);
                setQuizzes(qData.quizzes || []);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-yellow-500 border-dashed rounded-full animate-spin"></div>
        <span className="ml-3 text-yellow-400 text-lg animate-pulse">
            Loading dashboard...
        </span>
    </div>;

    // 📊 Stats
    const totalAssignments = assignments.length;
    const submittedAssignments = assignments.filter((a) => a.submitted).length;

    const totalQuizzes = quizzes.length;
    const attemptedQuizzes = quizzes.filter((q) => q.attempted).length;

    // ✅ Ensure data is never negative
    const assignmentData = [
        { name: "Submitted", value: submittedAssignments || 0 },
        { name: "Pending", value: Math.max(totalAssignments - submittedAssignments, 0) },
    ];

    const quizData = [
        { name: "Attempted", value: attemptedQuizzes || 0 },
        { name: "Remaining", value: Math.max(totalQuizzes - attemptedQuizzes, 0) },
    ];

    const COLORS = ["#00C49F", "#FF4444"];

    return (
        <div className="p-6 grid gap-6 md:grid-cols-3 bg-gray-950 min-h-screen">
            {/* 🎓 Courses */}
            <motion.div whileHover={{ scale: 1.05 }}>
                <Card>
                    <CardContent>
                        <h2 className="text-xl font-bold mb-2">My Courses</h2>
                        <p className="text-4xl font-extrabold">{courses.length}</p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 📝 Assignments */}
            <motion.div whileHover={{ scale: 1.05 }}>
                <Card>
                    <CardContent>
                        <h2 className="text-xl font-bold mb-2">Assignments</h2>
                        <PieChart width={250} height={200}>
                            <Pie
                                data={assignmentData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={70}
                                dataKey="value"
                            >
                                {assignmentData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }} />
                            <Legend wrapperStyle={{ color: "white" }} />
                        </PieChart>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 📚 Quizzes */}
            <motion.div whileHover={{ scale: 1.05 }}>
                <Card>
                    <CardContent>
                        <h2 className="text-xl font-bold mb-2">Quizzes</h2>
                        <PieChart width={250} height={200}>
                            <Pie
                                data={quizData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={70}
                                dataKey="value"
                            >
                                {quizData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }} />
                            <Legend wrapperStyle={{ color: "white" }} />
                        </PieChart>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
