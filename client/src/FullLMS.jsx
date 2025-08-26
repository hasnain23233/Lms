import React from 'react'
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import Home from './mainPages/Home';

const FullLMS = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<h1>This is a about page of the application</h1>} />
            </Routes>
        </div>
    )
}

export default FullLMS
