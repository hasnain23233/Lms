import React from 'react'

const Navbar = () => {
    return (
        <div className='py-6 px-4 h-full flex flex-col justify-between'>
            <div>
                <h1 className='text-2xl font-semibold '>
                    LMS <br /> <span className='text-yellow-500 tracking-wider text-xl'>(learning management system)</span>
                </h1>
                <ul>
                    <li>
                        <a href="#" className='block py-2 px-4 rounded text-gray-200 hover:bg-gray-600 mt-6'>All Course</a>
                        <a href="#" className='block py-2 px-4 rounded text-gray-200 hover:bg-gray-600 '>Home</a>
                        <a href="#" className='block py-2 px-4 rounded text-gray-200 hover:bg-gray-600 '>About</a>
                    </li>
                </ul>
            </div>
            <ul className='bg-gray-600 mt-6 p-4 rounded'>
                <li >
                    <a href="#" className='block py-2 px-4 rounded text-gray-200 hover:bg-gray-500 '>Login</a>
                    <a href="#" className='block py-2 px-4 rounded text-gray-200 hover:bg-gray-500 '>Signup</a>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
