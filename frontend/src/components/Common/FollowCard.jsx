import React from 'react'
import dp from "../assests/dp.jpg"

const FollowCard = () => {
  return (
    <div className='w-[280px] flex justify-between items-center gap-2'>
        <div className='flex gap-2 items-center'>
            <img src={dp} alt="" className='w-[45px] h-[45px] rounded-full'/>
            <div>
                <h1 className='font-semibold text-sm'>Pankaj Kuamr</h1>
                <h2 className='text-sm'>User Name</h2>
            </div>
        </div>
        
        <button className='text-blue-500 text-sm font-semibold'>Follow</button>
    </div>
  )
}

export default FollowCard