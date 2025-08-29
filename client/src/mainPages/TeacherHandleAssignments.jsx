import { useEffect, useState } from "react";
import { useAssignmentStore } from "../store/assignmentStore";

const TeacherAssignment = () => {
    const { assignments, fetchAllAssignments, updateAssignment, deleteAssignment } = useAssignmentStore();
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "" });

    useEffect(() => {
        fetchAllAssignments();
    }, []);

    const handleEditClick = (assignment) => {
        setEditingId(assignment._id);
        setFormData({ title: assignment.title, description: assignment.description });
    };

    const handleUpdate = async (id) => {
        await updateAssignment(id, formData);
        setEditingId(null);
        setFormData({ title: "", description: "" });
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this assignment?")) {
            await deleteAssignment(id);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-200">📚 All Assignments</h2>
            {assignments.length === 0 ? (
                <p className="text-gray-500">No assignments found</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assignments.map((a) => (
                        <div
                            key={a._id}
                            className="bg-gray-600 rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                        >
                            {editingId === a._id ? (
                                <>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="border p-2 w-full bg-transparent rounded-lg mb-3 focus:ring focus:ring-blue-300"
                                    />
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="border p-2 bg-transparent w-full rounded-lg mb-3 focus:ring focus:ring-blue-300"
                                    />
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleUpdate(a._id)}
                                            className="bg-green-500 hover:bg-green-600 text-gray-600 px-4 py-2 rounded-lg"
                                        >
                                            💾 Save
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="bg-gray-400 hover:bg-gray-500 text-gray-600 px-4 py-2 rounded-lg"
                                        >
                                            ❌ Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-200">{a.title}</h3>
                                    <p className="text-gray-300 mt-1">{a.description}</p>

                                    <p className="text-gray-300 mt-1">{a.date}</p>
                                    <p className="text-sm text-gray-200 mt-2">📘 Course ID: {a.courseId}</p>
                                    <div className="mt-4 flex gap-3">
                                        <button
                                            onClick={() => handleEditClick(a)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(a._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeacherAssignment;
