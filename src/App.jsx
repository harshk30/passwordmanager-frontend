import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Manager from './components/Manager'
import Footer from './components/Footer'
function App() {

  return (
    <>
    <div className='bg-gradient-to-b from-slate-500 to-slate-100 w-screen h-screen'>
    <Navbar/> 
    <div className="min-h-[87.7vh]">
    <Manager/>
    </div> 
    <Footer/>
    </div>
    </>

  )
}

export default App
