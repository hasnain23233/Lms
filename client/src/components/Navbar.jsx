import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='py-6 px-4 h-full flex flex-col justify-between'>
            <div>
                <h1 className='text-2xl font-semibold '>
                    LMS <br /> <span className='text-yellow-500 tracking-wider text-xl'>(learning management system)</span>
                </h1>
                <ul>
                    <li>
                        <Link to="/all-courses" className='block py-2 px-4 rounded text-gray-200 hover:bg-gray-600 mt-6'>All Course</Link>
                        <Link to="/" className='block py-2 px-4 rounded text-gray-200 hover:bg-gray-600 '>Home</Link>
                        <Link to="/about" className='block py-2 px-4 rounded text-gray-200 hover:bg-gray-600 '>About</Link>
                    </li>
                </ul>
            </div>
            <ul className='bg-gray-600 mt-6 p-4 rounded'>
                <li >
                    <Link to="/login" className='block py-2 px-4 rounded text-gray-200 hover:bg-gray-500 '>Login</Link>
                    <Link to="/signup" className='block py-2 px-4 rounded text-gray-200 hover:bg-gray-500 '>Signup</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
