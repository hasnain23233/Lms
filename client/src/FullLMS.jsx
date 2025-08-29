import React from 'react'
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import Home from './mainPages/Home';
import About from './mainPages/About';
import Signup from './components/signup';
import LoginForm from './components/Login';
import AllCourses from './mainPages/AllCourses';
import AddCourses from './mainPages/AddCourse';
import HandleCourses from './mainPages/HandleCourses';
import TeacherCreateQuiz from './mainPages/TeacherCreateQuiz';
import ManageQuiz from './mainPages/ManageQuiz';
import TeacherAssignments from './mainPages/TeacherAssignments';

const FullLMS = () => {
    return (
        <div>
            <Routes>
                <Route path="/all-courses" element={<AllCourses />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/add-course" element={<AddCourses />} />
                <Route path="/handle-courses" element={<HandleCourses />} />
                <Route path="/create-quiz" element={<TeacherCreateQuiz />} />
                <Route path="/manage-quiz" element={<ManageQuiz />} />
                <Route path="/make-assignment" element={<TeacherAssignments />} />
            </Routes>
        </div>
    )
}

export default FullLMS
