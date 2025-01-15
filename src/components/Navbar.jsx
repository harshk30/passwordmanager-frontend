import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-4">  
        <div className="logo text-2xl font-bold"> &lt; SecurePass /&gt;</div>
        <ul>
        <li className='flex gap-4'>
        <a href='/' className='hover:font-bold'>Home</a>
        <a href='#' className='hover:font-bold'>About</a>
        <a href='#' className='hover:font-bold'>Contact</a>
        </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar