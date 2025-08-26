import React from 'react'
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import Home from './mainPages/Home';
import About from './mainPages/About';
import Signup from './components/signup';

const FullLMS = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    )
}

export default FullLMS
