import React from 'react'
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import Home from './mainPages/Home';
import About from './mainPages/About';

const FullLMS = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    )
}

export default FullLMS
