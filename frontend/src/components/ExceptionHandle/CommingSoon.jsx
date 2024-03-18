import React from 'react'
import { NavLink } from 'react-router-dom'

const CommingSoon = () => {
  return (
    <div className='text-center'>
        <h1 className='text-3xl font-bold'>This feature is on the Way</h1>
        <h2>Get back to home page</h2>
        <div className='mt-4'>
            <NavLink to={"/"} className="bg-gray-200 p-2 px-6 mt-5 rounded-2xl">Home</NavLink>
        </div>
        
    </div>
  )
}

export default CommingSoon