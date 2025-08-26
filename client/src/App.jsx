import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FullLMS from './FullLMS'
import Navbar from './components/Navbar'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen gap-6 bg-gray-800 text-white flex justify-between overflow-hidden'>
        <div className='w-3/12 bg-gray-700'>
          <Navbar />
        </div>
        <div className='w-9/12 h-full overflow-auto px-2 '>
          <FullLMS />
        </div>
      </div>
    </>
  )
}

export default App
